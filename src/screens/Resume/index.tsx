import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';
import { Container, Content, Header, Title } from './styles';
import { categories } from '../../utils/categories';
import { useFocusEffect } from '@react-navigation/native';

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
  total: string;
  color: string;
}

export function Resume() {
  const dataKey = '@go-finances:transactions';
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [],
  );
  async function loadData() {
    const registers = await AsyncStorage.getItem(dataKey);
    const registersFormatted: TransactionData[] = JSON.parse(registers!) || [];
    const expansive = registersFormatted.filter(
      (item) => item.type === 'negative',
    );
    const totalByCategory: CategoryData[] = [];
    categories.forEach((category) => {
      let categorySum = 0;
      expansive.forEach((item) => {
        if (item.category === category.key) {
          categorySum += Number(item.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        totalByCategory.push({
          ...category,
          total,
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
      <Content>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.name}
            title={item.name}
            amount={item.total}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
