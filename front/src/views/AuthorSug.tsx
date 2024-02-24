import { StyleSheet, View, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import { useAuthorSuggestion } from '../hooks/suggestions/author';
import KAuthorSuggestion from '../components/AuthorSug';

interface Props {
    term?: any;
}

export default function KAuthorSuggestionView(props: Props) {
    const [isSuggestionComplete, suggestions] = useAuthorSuggestion(props.term);

    return (
        <View style={styles.container}>
            <ScrollView>
                {suggestions && suggestions.map((author, index) => {
                    return (
                        <View style={styles.sug} key={index}>
                            <KAuthorSuggestion
                                author={author}
                                onPress={() => { console.log('Author: ', author); }}
                            />
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: Colors.light.canvas,
        padding: Physics.padding.large,
        borderRadius: Physics.borderRadius.medium,
    },
    sug: {
        paddingBottom: Physics.padding.medium,
    },
});
