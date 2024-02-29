import { Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import { Book } from '../models/book';
import Strings from '../constants/strings';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import KAuthorTile from './AuthorTile';
import IconButton from './IconButton';

interface Props {
    book: Book;
    onPress?: () => void;
}

export default function KSearchResult(props: Props) {
    const book = props.book;
    return (
        <View style={styles.wrapper}>
            <View style={styles.leading}>
                <Image source={{ uri: Strings.apiBookCover_(book.id) }} style={{ flex: 1 }} />
                {/* <Ionicons name="book" size={Physics.icon.large} color={Colors.light.primaryDark} /> */}
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={{ flex: 1 }} onPress={props.onPress}>
                        <Text style={styles.title}>{book.title}</Text>
                    </Pressable>
                    <IconButton link={{ pathname: `/read/${book.id}`, params: { url: book.formats['application/epub+zip'] } }}>
                        <Ionicons name="eye" size={Physics.icon.medium} color={Colors.light.secondary} />
                    </IconButton>
                </View>
                {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text>{Strings.authors}: </Text>
                    <View style={styles.subtitleContainer}>
                        {book.authors.length > 1
                            ? book.authors.slice(0, 2).map((author, i) => (
                                <Text key={i} style={styles.subtitle}>{author.name}</Text>
                            ))
                            : <Text style={styles.subtitle}>{Strings.unknown}</Text>
                        }
                    </View>
                </View> */}
                <View style={styles.bottomContainer}>
                    <Text>Subjects: </Text>
                    <Text style={{ ...styles.subtitle, maxWidth: '85%' }} numberOfLines={1}>
                        {book.subjects.slice(0, 2).map((subject, i) => subject)}
                    </Text>
                </View>
                <ScrollView horizontal={true}>
                    {book.authors && book.authors.map((author, i) => (
                        <View key={i} style={styles.authorWrapper}>
                            <KAuthorTile author={author} />
                            {/* <View style={styles.authorLeading}>
                                <Ionicons name="person" size={Physics.icon.medium} color={Colors.light.primaryDark} />
                            </View>
                            <View style={styles.container}>
                                <View>
                                    <Text numberOfLines={2} style={styles.authorTitle}>{author.name}</Text>
                                </View>
                                {(author.birth_year || author.death_year) && <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Physics.gap.small }}>
                                    <Text>{author.birth_year}</Text>
                                    {author.birth_year && <Text>-</Text>}
                                    <Text>{author.death_year}</Text>
                                </View>}
                            </View> */}
                        </View >
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    authorWrapper: {
        marginRight: Physics.gap.medium,
    },
    authorLeading: {
        padding: Physics.padding.small,
        borderRadius: Physics.borderRadius.medium,
        borderWidth: Physics.borderWidth.small,
        borderColor: Colors.light.background,
        backgroundColor: Colors.light.background,
        overflow: 'hidden',
    },
    authorTitle: {
        fontWeight: 'bold',
    },
    wrapper: {
        padding: Physics.padding.medium,
        gap: Physics.gap.large,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        color: Colors.light.textInput.background ?? Colors.light.text ?? '#fff',
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.canvas,
    },
    leading: {
        // flex: 1,
        width: 80,
        aspectRatio: Physics.aspectRatio.bookCover,
        // paddingVertical: Physics.padding.medium,
        // paddingHorizontal: Physics.padding.large,
        borderRadius: Physics.borderRadius.small,
        borderWidth: Physics.borderWidth.small,
        borderColor: Colors.light.background,
        backgroundColor: Colors.light.background,
        overflow: 'hidden',
    },
    container: {
        flex: 4,
        fontSize: Physics.text.body.medium,
        fontWeight: 'bold',
        flexDirection: 'column',
        gap: Physics.gap.small,
    },
    title: {
        fontWeight: 'bold',
        fontSize: Physics.text.title.small,
    },
    subtitle: {
        fontSize: Physics.text.body.medium,
        color: Colors.light.text.subtitle ?? '#fff',
    },
    subtitleContainer: {
        flexDirection: 'row',
        gap: Physics.gap.small,
    },
    bottomContainer: {
        flexDirection: 'row',
        gap: Physics.gap.small,
        columnGap: 0,
    },
});
