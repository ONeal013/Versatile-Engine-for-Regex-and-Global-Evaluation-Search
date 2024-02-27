import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import { useBookSuggestion } from '../hooks/suggestions/book';
import { Book } from '../models/book';
import React from 'react';
import Strings from '../constants/strings';
import Ionicons from '@expo/vector-icons/Ionicons';
import KAuthorTile from '../components/AuthorTile';

interface Props {
    book: Book;
}

export default function KBookSuggestionView(props: Props) {
    const [isSuggestionComplete, suggestions] = useBookSuggestion(props.book);
    const book = props.book;
    return (
        <View>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.image}>
                        <Image source={{ uri: Strings.apiBookCover_(book.id) }} style={{ flex: 1 }} />
                    </View>
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.title}>{book.title}</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{}} numberOfLines={10}>
                                {book.subjects.map((subject, i) => subject)}
                            </Text>
                            <Text>{book.bookshelves}</Text>
                            <Text>{book.languages}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.pad} horizontal={true}>
                    {book.authors && book.authors.map((author, i) => (
                        <View key={i}>
                            <KAuthorTile author={author} />
                        </View >
                    ))}
                </ScrollView>
                <View style={styles.pad}>
                    <Text style={styles.litleTitle}>Similar books</Text>
                </View>
                {isSuggestionComplete === false &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: Physics.padding.large }}>
                        <ActivityIndicator style={{ flex: 1 }} size="large" color={Colors.light.secondary} />
                    </View>
                }
                <ScrollView style={styles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {suggestions && suggestions.similarDocs.map((entry, index) => {
                        return (
                            <View style={{ ...styles.sug, width: 90 }} key={index}>
                                <View style={{ ...styles.image, width: 90 }}>
                                    <Image source={{ uri: Strings.apiBookCover_(entry.docId.id) }} style={{ flex: 1 }} />
                                </View>
                                <Text style={styles.litleTitle} numberOfLines={2}>{entry.docId.title}</Text>
                                {entry.docId.authors[0] && <Text>{entry.docId.authors[0]?.name}</Text>}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        maxWidth: 450,
        height: 'auto',
        flexDirection: 'column',
        // justifyContent: 'center',
        backgroundColor: Colors.light.canvas,
        borderRadius: Physics.borderRadius.medium,
        overflow: 'hidden',
        marginRight: Physics.gap.medium,
        gap: Physics.gap.medium,
    },
    container: {
        flexDirection: 'row',
        gap: Physics.gap.medium,
        padding: Physics.padding.medium,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        gap: Physics.gap.medium,
    },
    scroller: {
        padding: Physics.padding.medium,
    },
    sug: {
        // flexDirection: 'column',
        // paddingBottom: Physics.padding.medium,
        gap: Physics.gap.small,
        paddingRight: Physics.padding.medium,
        marginRight: Physics.gap.medium,
    },
    image: {
        aspectRatio: Physics.aspectRatio.bookCover,
        width: 150,
        borderRadius: Physics.borderRadius.small,
        overflow: 'hidden',
    },
    title: {
        fontWeight: 'bold',
        fontSize: Physics.text.title.small,
    },
    pad: {
        paddingHorizontal: Physics.padding.medium,
    },
    litleTitle: { fontSize: Physics.text.body.small, fontWeight: 'bold' }
});
