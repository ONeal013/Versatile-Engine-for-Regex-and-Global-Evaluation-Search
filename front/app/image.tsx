import Strings from "../src/constants/strings";
import { Image, View } from 'react-native';

export default function KImage() {
    return (
        <View style={{ flex: 1, width: 100, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: Strings.apiBookCover_(84) }} style={{ flex: 1, width: 50, height: 50 }} />
        </View>
    );
}