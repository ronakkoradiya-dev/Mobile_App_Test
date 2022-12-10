import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import AppRouter from '../navigation/AppRouter';

import { Colors } from '../utils/Colors';

const App = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle='dark-content'
        hidden={false}
        backgroundColor={Colors.WHITE_COLOR}
        translucent={false}
      />
      <AppRouter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
});

export default App;