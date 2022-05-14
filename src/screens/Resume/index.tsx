import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  ChartContainer,
  Container,
  Content,
  Header,
  Title,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectionIcon,
} from './styles';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const dataKey = '@go-finances:transactions';
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [],
  );
  const theme = useTheme();
  function handleDateChange(action: 'next' | 'previous') {
    if (action === 'next') {
      console.log(addMonths(selectedDate, 1));
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }
  async function loadData() {
    const registers = await AsyncStorage.getItem(dataKey);
    const registersFormatted: TransactionData[] = JSON.parse(registers!) || [];
    const expensive = registersFormatted.filter(
      (item) => item.type === 'negative',
    );
    const expensiveTotal = expensive.reduce(
      (acc, item) => acc + Number(item.amount),
      0,
    );
    const totalByCategory: CategoryData[] = [];
    categories.forEach((category) => {
      let categorySum = 0;
      expensive.forEach((item) => {
        if (item.category === category.key) {
          categorySum += Number(item.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(2)}%`;
        totalByCategory.push({
          ...category,
          total: categorySum,
          totalFormatted: total,
          percent,
        });
      }
    });
    setTotalByCategories(totalByCategory);
  }
  useEffect(() => {
    loadData();
  }, []);
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}>
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('previous')}>
            <MonthSelectionIcon name='chevron-left' />
          </MonthSelectButton>
          <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>
          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectionIcon name='chevron-right' />
          </MonthSelectButton>
        </MonthSelect>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x='percent'
            y='total'
            colorScale={totalByCategories.map((item) => item.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
          />
        </ChartContainer>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.name}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
