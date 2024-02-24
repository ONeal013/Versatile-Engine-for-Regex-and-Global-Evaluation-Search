import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import Strings from '../constants/strings';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Author } from '../models/author';

interface Props {
    author: Author;
    onPress?: () => void;
}

export default function KAuthorSuggestion(props: Props) {
    const author = props.author;
    return (
        <Pressable style={styles.wrapper} onPress={props.onPress}>
            <View style={styles.leading}>
                <Ionicons name="person" size={Physics.icon.large} color={Colors.light.primaryDark} />
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{author.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Physics.gap.medium }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text>{Strings.birthYear}: </Text>
                        <Text>{author.birth_year}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text>{Strings.deathYear}: </Text>
                        <Text>{author.death_year}</Text>
                    </View>
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
        backgroundColor: Colors.light.background,
    },
    leading: {
        paddingVertical: Physics.padding.medium,
        paddingHorizontal: Physics.padding.large,
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.canvas,
    },
    container: {
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
