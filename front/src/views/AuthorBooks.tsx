import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, Pressable } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import { Book } from '../models/book';
import React from 'react';
import Strings from '../constants/strings';
import { Author } from '../models/author';
import { useAuthorBookSuggestion } from '../hooks/suggestions/authorBooks';
import { Link } from 'expo-router';

interface Props {
    author: Author;
    onSuggestionSelect?: (book: Book) => void;
}

export default function KBookSuggestionView(props: Props) {
    const [isSuggestionComplete, suggestions] = useAuthorBookSuggestion(props.author);
    return (
        <View>
            <View style={styles.wrapper}>
                <View style={styles.pad}>
                    <Text style={styles.litleTitle}>Author books</Text>
                </View>
                {isSuggestionComplete === false &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: Physics.padding.large }}>
                        <ActivityIndicator style={{ flex: 1 }} size="large" color={Colors.light.secondary} />
                    </View>
                }
                <ScrollView style={styles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {suggestions && suggestions.map((entry, index) => {
                        return (
                            <Link style={{ ...styles.sug, width: 90 }} key={index} href={`/search?q=${entry.title}`}>
                                <View style={{ ...styles.image, width: 90 }}>
                                    <Image source={{ uri: Strings.apiBookCover_(entry.id) }} style={{ flex: 1 }} />
                                </View>
                                <Text style={styles.litleTitle} numberOfLines={2}>{entry.title}</Text>
                            </Link>
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
        height: 'auto',
        flexDirection: 'column',
        // justifyContent: 'center',
        borderRadius: Physics.borderRadius.medium,
        overflow: 'hidden',
        marginRight: Physics.gap.medium,
        marginBottom: Physics.gap.medium,
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
