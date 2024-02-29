import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import Strings from '../constants/strings';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Author } from '../models/author';
import { Link } from 'expo-router';

interface Props {
    author: Author;
    onPress?: () => void;
}

export default function KAuthorSuggestion(props: Props) {
    const author = props.author;
    return (
        <View style={styles.wrapper}>
            <View style={styles.leading}>
                <Ionicons name="person" size={Physics.icon.large} color={Colors.light.primaryDark} />
            </View>
            <View style={styles.container}>
                <Link href={`/search/authors?q=${author.name}`} >
                    <Text numberOfLines={2} style={styles.title}>{author.name}</Text>
                </Link>
                {(author.birth_year || author.death_year) && <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Physics.gap.small }}>
                    <Text>{author.birth_year}</Text>
                    {author.birth_year && <Text>-</Text>}
                    <Text>{author.death_year}</Text>
                </View>}
            </View>
            {/* 
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Physics.gap.medium }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text>{Strings.birthYear}: </Text>
                        <Text>{author.birth_year}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text>{Strings.deathYear}: </Text>
                        <Text>{author.death_year}</Text>
                    </View>
                </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: Physics.padding.small,
        gap: Physics.gap.large,
        width: 125,
        height: 200,
        flexDirection: 'column',
        color: Colors.light.textInput.background ?? Colors.light.text ?? '#fff',
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.canvas,
    },
    leading: {
        flex: 2,
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.background,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
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
