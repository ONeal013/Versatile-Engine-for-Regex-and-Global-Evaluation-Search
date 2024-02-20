import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default async function App() {
  // set system nav bar color to red
  // rawait NavigationBar.setBackgroundColorAsync('#FF0000');
  return (
    <View style={styles.container}>
      <Text>Text</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
