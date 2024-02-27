import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import { useBookSuggestion } from '../hooks/suggestions/book';
import { Book } from '../models/book';

interface Props {
    book: Book;
}

export default function KBookSuggestionView(props: Props) {
    const [isSuggestionComplete, suggestions] = useBookSuggestion(props.book);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
                {suggestions && suggestions.similarDocs.map((entry, index) => {
                    return (
                        <View style={styles.sug} key={index}>
                            <Text>{entry.docId.title}</Text>
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
        maxWidth: 350,
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
