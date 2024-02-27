import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
import KAuthorSuggestionView from '../src/views/AuthorSug';
import KBookSuggestionView from '../src/views/BookSug';


export default function Search() {
    NavigationBar.setBackgroundColorAsync('#1d2437');

    // hooks
    const [term, setTerm] = React.useState<string>('');
    const [isLoadingComplete, results, searchStr] = useSearch();

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <StatusBar style="dark" />
                <View style={styles.searchContainer}>
                    <SafeAreaView style={styles.searchZone}>
                        <KTextInput value={term} onChangeText={setTerm} onSubmitEditing={() => searchStr(term)} />
                        <KButton title={Strings.search} onPress={() => searchStr(term)} />
                        {/* <KIconButton name="settings" onPress={() => { }} />*/}
                    </SafeAreaView>
                </View>
                {isLoadingComplete === false &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator style={{ flex: 1 }} size="large" color={Colors.light.secondaryDark} />
                    </View>
                }
                {isLoadingComplete === true && results && <View style={styles.resultZone}>
                    <ScrollView>
                        {
                            results.tokens &&
                            <View style={styles.resultInfo}>
                                <View style={styles.resultTokens}>
                                    {results.data && <Text>{results.data!.length} Results</Text>}
                                    <Text>for :</Text>
                                    {Object.keys(results.tokens).map((token, i) => (
                                        <Text key={i}>{token}</Text>
                                    ))}
                                </View>
                            </View>
                        }
                        {results?.data && <View style={styles.sugContainer}>
                            <KAuthorSuggestionView term={term} />
                        </View>}
                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView style={styles.resultList} showsVerticalScrollIndicator={false}>
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
                            {results.data && <KBookSuggestionView book={results.data[0]} />}
                        </View>
                    </ScrollView>
                </View>}
            </View>
            {/* <SafeAreaProvider>
            <View style={styles.container}>
                { <KBackground /> }
                {results?.data
                    ? <StatusBar style="dark" />
                    : <StatusBar style="light" />
                }
                <View style={styles.searchContainer}>
                    <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                        <SafeAreaView style={styles.searchZone}>
                            <KTextInput value={term} onChangeText={setTerm} onSubmitEditing={() => searchStr(term)} />
                            <KButton title={Strings.search} onPress={() => searchStr(term)} />
                            { <KIconButton name="settings" onPress={() => { }} /> }
                        </SafeAreaView>
                    </View>
                    {results && <View style={styles.resultZone}>
                        {
                            results.tokens &&
                            <View style={styles.resultInfo}>
                                <View style={styles.resultTokens}>
                                    {results.data && <Text>{results.data!.length} Results</Text>}
                                    <Text>for :</Text>
                                    {Object.keys(results.tokens).map((token, i) => (
                                        <Text key={i}>{token}</Text>
                                    ))}
                                </View>
                            </View>
                        }
                        {results?.data && <View style={styles.sugContainer}>
                            <KAuthorSuggestionView term={term} />
                        </View>}
                        {isLoadingComplete === false && <ActivityIndicator style={{ flex: 1 }} size="large" color="#fff" />}
                        {isLoadingComplete === true && results !== null && (
                            <ScrollView style={styles.resultList} showsVerticalScrollIndicator={false}>
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
            </View>
        </SafeAreaProvider> */}
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: Colors.light.background ?? '#fff',
    },
    sugContainer: {
        // flex: 1,
        // padding: Physics.padding.small,
    },
    searchContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchZone: {
        flex: 1,
        padding: Physics.padding.large,
        gap: Physics.gap.medium,
        flexDirection: 'row',
        maxWidth: 700,
        width: '100%',
    },
    resultZone: {
        flex: 1,
        maxWidth: '100%',
    },
    resultInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Physics.gap.medium,
    },
    resultList: {
        flexGrow: 1,
        gap: Physics.gap.large,
        paddingHorizontal: Physics.padding.medium,
        borderRadius: Physics.borderRadius.medium,
    },
    resultItem: {
        paddingBottom: Physics.padding.medium,
    },
    resultTokens: {
        paddingVertical: Physics.padding.small,
        paddingHorizontal: Physics.padding.large,
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.canvas,
        flexDirection: 'row',
        gap: Physics.gap.small,
    },
    resultMessage: {
        padding: Physics.padding.small,
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.canvas,
    },
});
