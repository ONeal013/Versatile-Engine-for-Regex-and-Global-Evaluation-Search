import { Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Author } from '../models/author';
import { Link } from 'expo-router';

interface Props {
    author: Author;
    onPress?: () => void;
}

export default function KAuthorTile(props: Props) {
    const author = props.author;
    return (
        <Link href={`/search/authors?q=${author.name}`}>
            <View style={styles.authorWrapper}>
                <View style={styles.authorLeading}>
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
                </View>
            </View>
        </Link>
    );
}

const styles = StyleSheet.create({
    authorWrapper: {
        flexDirection: 'row',
        gap: Physics.gap.small,
        padding: Physics.padding.small,
        borderRadius: Physics.borderRadius.medium,
        borderWidth: Physics.borderWidth.small,
        borderColor: Colors.light.background,
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
    container: {
        flex: 1,
        fontSize: Physics.text.body.medium,
        fontWeight: 'bold',
        flexDirection: 'column',
        gap: Physics.gap.small,
    },
});
