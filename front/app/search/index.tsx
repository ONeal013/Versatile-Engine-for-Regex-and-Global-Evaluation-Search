import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import KTextInput from '../../src/components/TextInput';
import KButton from '../../src/components/Button';
import Physics from '../../src/constants/physics';
import React, { useEffect } from 'react';
import KSearchResult from '../../src/components/search_result';
import { useSearch } from '../../src/hooks/search/basic';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Strings from '../../src/constants/strings';
import { ActivityIndicator } from 'react-native';
import Colors from '../../src/constants/colors';
import KAuthorSuggestionView from '../../src/views/AuthorSug';
import KBookSuggestionView from '../../src/views/BookSug';
import { useLocalSearchParams } from 'expo-router';
import { Book } from '../../src/models/book';
import KPaginator from '../../src/components/paginator';


export default function Search() {
    // get expo url params 
    const params = useLocalSearchParams<{ q?: string }>();
    NavigationBar.setBackgroundColorAsync('#1d2437');

    // hooks
    const [term, setTerm] = React.useState<string>(params.q ?? '');
    const [isLoadingComplete, results, searchedTerm, searchStr] = useSearch();

    const searchBook = (book: Book) => {
        setTerm(book.title);
        return searchStr(book.title);
    }

    const correctedText: Array<React.JSX.Element> = [];
    const typos = Object.entries(results?.typos ?? {});
    if (typos.length > 0) {
        let _term = (searchedTerm ?? '').toLocaleLowerCase();
        typos.forEach(([subTerm, token]) => {
            const index = _term.indexOf(subTerm)
            const length = subTerm.length;
            correctedText.push(<Text>{_term.slice(0, index)}</Text>);
            correctedText.push(<Text style={{ fontWeight: 'bold' }}>{token}</Text>);
            _term = _term.slice(index + length);
        });
    } else {
        console.log('No typos found');
        correctedText.push(<Text>{searchedTerm}</Text>);
    }

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
                {results?.error && <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{results.error}</Text>
                </View>}
                {results && !results?.error && <View style={styles.resultZone}>
                    <ScrollView>
                        {
                            results.tokens &&
                            <View style={styles.resultInfo}>
                                <View style={styles.resultTokens}>
                                    {results.info && <Text style={{ fontWeight: 'bold' }}>{results.info!.length}</Text>}
                                    <Text>results in</Text>
                                    {results.info && <Text style={{ fontWeight: 'bold' }}>{results.info!.time} second(s)</Text>}
                                    <Text>for :</Text>
                                    {correctedText}
                                </View>
                                <View style={styles.resultTokens}>
                                    <Text>Page:</Text>
                                    {results.info && <Text style={{ fontWeight: 'bold' }}>{results.info!.page}</Text>}
                                    <Text>of</Text>
                                    {results.info && <Text style={{ fontWeight: 'bold' }}>{Math.ceil(results.info!.length / results.info!.limit)}</Text>}
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
                                                <KSearchResult book={book} onPress={() => searchBook(book)} />
                                            </View>
                                        ))
                                }
                            </ScrollView>
                            {results.data && results.data[0] && <KBookSuggestionView book={results.data[0]} onSuggestionSelect={searchBook} />}
                        </View>
                        {/* {results.info && <View>
                            <Text>Time: {results.info.time}s</Text>
                            <Text>length: {results.info.length}</Text>
                            <Text>Page: {results.info.page}</Text>
                            <Text>Pages: {(results.info.length / results.info.limit).toFixed()}</Text>
                        </View>} */}
                        {results.info && <View style={{ width: '100%', alignItems: 'center' }}>
                            <KPaginator
                                current={results.info.page}
                                total={results.info.length}
                                limit={results.info.limit}
                                neighbours={3}
                                onPageChange={(page) => searchStr(term, page)}
                            />
                        </View>}
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
