import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import { Book } from '../models/book';

interface Props {
    book: Book;
    onPress?: () => void;
}

export default function KSearchResult(props: Props) {
    const book = props.book;
    return (
        <Pressable onPress={props.onPress}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{book.title}</Text>
                </View>
                <View style={styles.subtitleContainer}>
                    {book.authors.map((author, i) => (
                        <Text key={i} style={styles.subtitle}>{author.name}</Text>
                    ))}
                </View>
                <View style={styles.bottomContainer}>
                    <Text>Subjects: </Text>
                    {book.subjects.map((subject, i) => (
                        <Text key={i} style={{ ...styles.subtitle, }}>{subject}</Text>
                    ))}
                </View>
            </View>
        </Pressable >
    );
}

const styles = StyleSheet.create({
    container: {
        fontSize: Physics.text.body.medium,
        fontWeight: 'bold',
        color: Colors.light.textInput.background ?? Colors.light.text ?? '#fff',
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.textInput.background,
        padding: Physics.padding.medium,
        elevation: Physics.elevation.medium,
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
        flexWrap: 'wrap',
        gap: Physics.gap.small,
        columnGap: 0,
    },
});
