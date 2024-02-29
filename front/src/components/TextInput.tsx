import { StyleSheet, TextInput, View, Platform } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onSubmitEditing?: () => void;
    // inputStyle?: ViewStyle;
}

export default function KTextInput(props: Props) {
    const initProps = {
        placeholder: 'Type something...',
    };
    props = Object.assign(initProps, props);/* 
    const inputStyle = Object.assign({ ...styles.input }, props.inputStyle);

    console.log('KTextInput: ', inputStyle); */

    return (
        <View style={styles.container}>
            <Ionicons
                name="search"
                size={Physics.icon.small}
                color={Colors.light.primaryDark}
            />
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                placeholderTextColor={Colors.light.textInput.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
                onSubmitEditing={props.onSubmitEditing}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Physics.gap.medium,
        paddingVertical: Physics.padding.medium,
        paddingHorizontal: Physics.padding.large,
        borderRadius: Physics.borderRadius.medium,
        backgroundColor: Colors.light.textInput.background,
        ...Physics.shadow,
        elevation: Physics.elevation.medium,
    },
    input: {
        height: 'auto',
        width: '100%',
        // shadowColor: 'red',
    },
    text: {
        fontSize: Physics.text.body.medium,
        color: Colors.light.textInput.background ?? Colors.light.text ?? '#fff',
    },
});
