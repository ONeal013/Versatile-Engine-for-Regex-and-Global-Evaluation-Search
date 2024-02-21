import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../styles/colors';
import Physics from '../styles/physics';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
}

export default function KBackground(props: Props) {
  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[Colors.light.primaryDark, Colors.light.primary]}
      style={styles.background}>
      <Ionicons
        style={{ position: 'absolute', alignContent: 'center', bottom: 15, }}
        name="star-outline" size={Physics.icon.small}
        color={Colors.light.icon} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
});
