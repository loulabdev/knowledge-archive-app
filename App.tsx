import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HubPage from './src/screens/HubPage';
import ExamHall from './src/screens/ExamHall';
import { ExamType } from './src/types/exam';

export type RootStackParamList = {
  Hub: undefined;
  ExamHall: {
    examType: ExamType;
    title?: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F7F8FA',
    card: '#FFFFFF',
    text: '#111827',
    border: '#E5E7EB',
    primary: '#2563EB',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Hub"
          screenOptions={{
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '700',
            },
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#111827',
            contentStyle: {
              backgroundColor: '#F7F8FA',
            },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="Hub"
            component={HubPage}
            options={{
              title: '지식서가',
            }}
          />

          <Stack.Screen
            name="ExamHall"
            component={ExamHall}
            options={({ route }) => ({
              title: route.params?.title ?? '문제 풀이',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
