import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../styles/colors';
import Physics from '../styles/physics';

interface Props {
  title: string;
  onPress?: () => void;
}

export default function KButton(props: Props) {
  return (
    <Pressable onPress={props.onPress}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[Colors.light.secondary, Colors.light.secondaryDark]}
        style={styles.background}>
        <Text style={styles.text}>{props.title}</Text>
      </LinearGradient>
    </Pressable >
  );
}

const styles = StyleSheet.create({
  background: {
    paddingVertical: Physics.padding.medium,
    paddingHorizontal: Physics.padding.large,
    borderRadius: Physics.borderRadius.medium,
    elevation: Physics.elevation.medium,
  },
  text: {
    fontSize: Physics.text.body.medium,
    color: Colors.dark.textInput.background ?? Colors.dark.text ?? '#fff',
  },
});
