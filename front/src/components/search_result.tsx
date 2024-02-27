import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import { Book } from '../models/book';
import Strings from '../constants/strings';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    book: Book;
    onPress?: () => void;
}

export default function KSearchResult(props: Props) {
    const book = props.book;
    return (
        <Pressable style={styles.wrapper} onPress={props.onPress}>
            <View style={styles.leading}>
                <Image source={{ uri: Strings.apiBookCover_(book.id) }} style={{ flex: 1, width: 50, height: 100 }} />
                {/* <Ionicons name="book" size={Physics.icon.large} color={Colors.light.primaryDark} /> */}
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{book.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text>{Strings.authors}: </Text>
                    <View style={styles.subtitleContainer}>
                        {book.authors.length > 1
                            ? book.authors.slice(0, 2).map((author, i) => (
                                <Text key={i} style={styles.subtitle}>{author.name}</Text>
                            ))
                            : <Text style={styles.subtitle}>{Strings.unknown}</Text>
                        }
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text>Subjects: </Text>
                    <Text style={{ ...styles.subtitle, maxWidth: '85%' }} numberOfLines={1}>
                        {book.subjects.slice(0, 2).map((subject, i) => subject)}
                    </Text>
                </View>
            </View>
        </Pressable >
    );
}

const styles = StyleSheet.create({
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
        paddingVertical: Physics.padding.medium,
        paddingHorizontal: Physics.padding.large,
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.background,
    },
    container: {
        flexGrow: 1,
        fontSize: Physics.text.body.medium,
        fontWeight: 'bold',
        flexDirection: 'column',
    },
    title: {
        fontWeight: 'bold',
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
