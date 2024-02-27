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
            <ScrollView style={styles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
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
        width: '100%',
        flexDirection: 'column',
        // justifyContent: 'center',
        // backgroundColor: Colors.light.canvas,
        borderRadius: Physics.borderRadius.medium,
        overflow: 'hidden',
    },
    scroller: {
        padding: Physics.padding.medium,
    },
    sug: {
        // paddingBottom: Physics.padding.medium,
        paddingRight: Physics.padding.medium,
    },
});
