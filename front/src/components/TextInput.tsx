import { StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../styles/colors';
import Physics from '../styles/physics';

interface Props {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
}

export default function KTextInput(props: Props) {
    const initProps = {
        placeholder: 'Type something...',
    };
    props = Object.assign(initProps, props);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                placeholderTextColor={Colors.light.textInput.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 'auto',
        width: '100%',
        paddingVertical: Physics.padding.small,
        paddingHorizontal: Physics.padding.large,
        borderWidth: Physics.borderWidth.small,
        // shadowColor: 'red',
        borderColor: 'transparent',
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.textInput.background,
        elevation: Physics.elevation.large,
    },
    text: {
        fontSize: Physics.text.body.medium,
        color: Colors.light.textInput.background ?? Colors.light.text ?? '#fff',
    },
});
