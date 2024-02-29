import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import { useAuthorSuggestion } from '../hooks/suggestions/author';
import KAuthorSuggestion from '../components/AuthorSug';
import { Book } from '../models/book';

interface Props {
    book?: Book;
}

export default function KAuthorSuggestionView(props: Props) {
    const [isSuggestionComplete, suggestions] = useAuthorSuggestion(props.book);

    return (
        <View style={styles.container}>
            {isSuggestionComplete === false &&
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: Physics.padding.large }}>
                    <ActivityIndicator style={{ flex: 1 }} size="large" color={Colors.light.secondary} />
                </View>
            }
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
