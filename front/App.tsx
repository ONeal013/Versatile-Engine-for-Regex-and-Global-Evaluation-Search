import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import KBackground from './src/components/Background';
import KTextInput from './src/components/TextInput';
import Colors from './src/styles/colors';
import KButton from './src/components/Button';
import Physics from './src/styles/physics';

export default function App() {
  // set system nav bar color to red
  // await NavigationBar.setBackgroundColorAsync('#FF0000');
  NavigationBar.setBackgroundColorAsync('#1d2437');
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <KBackground />
      <View style={styles.row}>
        <KTextInput />
        <KButton title="Search" onPress={() => console.log('Button pressed')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    padding: Physics.padding.medium,
    gap: Physics.gap.large,
    // backgroundColor: Colors.light.primary,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  }
});
