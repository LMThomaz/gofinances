import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';
import {
  Container,
  Header,
  Icon,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  HighlightCards,
  UserWrapper,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
} from './styles';

const PHOTO_USER_URI = 'https://avatars.githubusercontent.com/u/33641830?v=4';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const dataKey = '@go-finances:transactions';
  const [data, setData] = useState<DataListProps[]>([]);
  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = JSON.parse(response || '[]');
    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        const date = new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));
        return {
          ...item,
          amount,
          date,
        };
      },
    );
    setData(transactionsFormatted);
  }
  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: PHOTO_USER_URI,
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Thomaz</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name='power' />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type='up'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          type='down'
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última saída dia 03 de abril'
        />
        <HighlightCard
          type='total'
          title='Total'
          amount='R$ 16.141,00'
          lastTransaction='01 à 16 de abril'
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
