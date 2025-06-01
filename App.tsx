import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {defaultScreenStyle} from './src/styles/defaultScreenStyles';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
