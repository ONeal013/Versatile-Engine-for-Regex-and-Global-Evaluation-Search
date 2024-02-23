import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  icon: string;
  onPress?: () => void;
}

export default function KIconButton(props: Props) {
  return (
    // <Pressable style={styles.background} onPress={props.onPress}>
    //   <Ionicons name="settings" size={Physics.icon.medium} color={Colors.light.primaryDark} />
    // </Pressable >
    <View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    paddingVertical: Physics.padding.medium,
    paddingHorizontal: Physics.padding.large,
    borderRadius: Physics.borderRadius.medium,
    ...Physics.shadow,
    elevation: Physics.elevation.medium,
  },
});
