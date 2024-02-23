import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import KTextInput from '../src/components/TextInput';
import KButton from '../src/components/Button';
import Physics from '../src/constants/physics';
import React from 'react';
import KSearchResult from '../src/components/search_result';
import { useSearch } from '../src/hooks/search/basic';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Strings from '../src/constants/strings';
import { ActivityIndicator } from 'react-native';
import Colors from '../src/constants/colors';


export default function Search() {
    NavigationBar.setBackgroundColorAsync('#1d2437');

    // hooks
    const [term, setTerm] = React.useState<string>('');
    const [isLoadingComplete, results, searchStr] = useSearch();

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                {results?.data
                    ? <StatusBar style="dark" />
                    : <StatusBar style="light" />
                }
                <SafeAreaView style={styles.searchZone}>
                    <KTextInput value={term} onChangeText={setTerm} onSubmitEditing={() => searchStr(term)} />
                    <KButton title={Strings.search} onPress={() => searchStr(term)} />
                    {/* <KIconButton name="settings" onPress={() => { }} /> */}
                </SafeAreaView>
                {results && <View style={styles.resultZone}>
                    {isLoadingComplete === false && <ActivityIndicator style={{ flex: 1 }} size="large" color="#fff" />}
                    {isLoadingComplete === true && results !== null && (
                        <ScrollView style={styles.resultList}>
                            {
                                (results.message !== undefined)
                                    ? <View style={styles.resultMessage}>
                                        <Text>{results.message}</Text>
                                    </View>
                                    : (results.data ?? []).map((book, i) => (
                                        <View key={i} style={styles.resultItem}>
                                            <KSearchResult book={book} />
                                        </View>
                                    ))
                            }
                        </ScrollView>
                    )}
                </View>}
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
    },
    searchZone: {
        padding: Physics.padding.medium,
        gap: Physics.gap.medium,
        width: '100%',
        maxWidth: 700,
        // backgroundColor: Colors.light.primary,
        flexDirection: 'row',
        // flexWrap: 'wrap',
    },
    resultZone: {
        flex: 1,
    },
    resultList: {
        flex: 1,
        gap: Physics.gap.large,
        paddingLeft: Physics.padding.medium,
        paddingRight: Physics.padding.medium,
        paddingTop: Physics.padding.medium,
        maxWidth: 700,
    },
    resultItem: {
        paddingBottom: Physics.padding.medium,
    },
    resultMessage: {
        padding: Physics.padding.medium,
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.canvas,
    },
});
