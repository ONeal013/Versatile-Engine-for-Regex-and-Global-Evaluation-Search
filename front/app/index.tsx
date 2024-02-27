import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import KBackground from '../src/components/background';
import KTextInput from '../src/components/TextInput';
import KButton from '../src/components/Button';
import Physics from '../src/constants/physics';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Strings from '../src/constants/strings';
import { Link } from 'expo-router';
import Colors from '../src/constants/colors';


export default function App() {
  NavigationBar.setBackgroundColorAsync('#1d2437');

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <KBackground />
        <SafeAreaView style={styles.searchZone}>
          <Link href="/search" asChild>
            <Pressable style={styles.container}>
              <Text style={styles.input}>Type something...</Text>
            </Pressable>
          </Link>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
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
    gap: Physics.gap.small,
    width: '100%',
    // backgroundColor: Colors.light.primary,
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  searchBar: {
    flex: 1,
    color: Colors.light.textInput.placeholder,
  },
  input: {
    height: 'auto',
    width: '100%',
    paddingVertical: Physics.padding.medium,
    paddingHorizontal: Physics.padding.large,
    borderWidth: Physics.borderWidth.small,
    // shadowColor: 'red',
    borderColor: 'transparent',
    borderRadius: Physics.borderRadius.medium,
    backgroundColor: Colors.light.textInput.background,
    elevation: Physics.elevation.large,
  },
});
