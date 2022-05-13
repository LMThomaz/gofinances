import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}>
      <Screen
        name='Listagem'
        component={Dashboard}
        options={{
          tabBarIcon: ({ ...rest }) => (
            <MaterialIcons name='format-list-bulleted' {...rest} />
          ),
        }}
      />
      <Screen
        name='Cadastrar'
        component={Register}
        options={{
          tabBarIcon: ({ ...rest }) => (
            <MaterialIcons name='attach-money' {...rest} />
          ),
        }}
      />
      <Screen
        name='Resumo'
        component={Register}
        options={{
          tabBarIcon: ({ ...rest }) => (
            <MaterialIcons name='pie-chart' {...rest} />
          ),
        }}
      />
    </Navigator>
  );
}
