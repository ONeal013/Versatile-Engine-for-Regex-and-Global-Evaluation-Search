import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import KBackground from './src/components/Background';
import KTextInput from './src/components/TextInput';
import Colors from './src/constants/colors';
import KButton from './src/components/Button';
import Physics from './src/constants/physics';
import { useSearch } from './src/hooks/search/basic';
import React from 'react';

export default function App() {
  // set system nav bar color to red
  // await NavigationBar.setBackgroundColorAsync('#FF0000');
  NavigationBar.setBackgroundColorAsync('#1d2437');

  // hooks
  const [term, setTerm] = React.useState<string>('');
  const [isLoadingComplete, results, searchStr] = useSearch();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <KBackground />
      <View style={styles.searchZone}>
        <KTextInput value={term} onChangeText={setTerm} />
        <KButton title="Search" onPress={() => searchStr(term)} />
      </View>
      {isLoadingComplete === false && <Text>Loading...</Text>}
      {isLoadingComplete === true && results !== null && (
        <View style={styles.resultZone}>
          {(results.data ?? []).map((book, i) => (
            <Text key={i}>{book.title}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchZone: {
    padding: Physics.padding.medium,
    gap: Physics.gap.large,
    // backgroundColor: Colors.light.primary,
    width: '100%',
    maxWidth: 400,
    flexDirection: 'column',
    alignItems: 'center',
  },
  resultZone: {
    flex: 1,
    padding: Physics.padding.medium,
    gap: Physics.gap.large,
    width: '100%',
  },
});
