import {ScrollView, KeyboardAvoidingView, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';

type KeyboardScrollProps = {
  children: ReactNode;
};

const KeyboardScroll = ({children}: KeyboardScrollProps) => (
  <KeyboardAvoidingView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
  </KeyboardAvoidingView>
);

export default KeyboardScroll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
