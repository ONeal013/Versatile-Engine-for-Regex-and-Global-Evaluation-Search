import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { useLocalSearchParams } from 'expo-router';

export default function KReader() {
    // const { width, height } = useWindowDimensions();
    const { bookId } = useLocalSearchParams();

    const source = { uri: `https://www.gutenberg.org/ebooks/${bookId}.rdf`, cache: true };

    return (
        <View style={styles.container}>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages: any, filePath: any) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page: any, numberOfPages: any) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error: any) => {
                    console.log(error);
                }}
                onPressLink={(uri: any) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />
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