import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import RenderHTML from 'react-native-render-html';
import React, { useEffect, useState } from 'react';
import Strings from '../../src/constants/strings';

export default function KReader() {
    // const { width, height } = useWindowDimensions();
    const { bookId } = useLocalSearchParams();
    const [content, setContent] = useState<string>('');

    const url = Strings.apiBookRead_(bookId as string);

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
            },
        }
        )
            .then(async (data) => setContent((await data.json()).content))
            .catch(error => console.error('Error fetching data: ', error));
    });

    console.log('content: ', content);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>{content}</Text>
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

