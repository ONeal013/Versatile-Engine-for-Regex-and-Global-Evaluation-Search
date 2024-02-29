import { StyleSheet, View } from 'react-native';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import { Link } from 'expo-router';
import { Href } from 'expo-router/build/link/href';

interface Props {
  children: React.ReactNode;
  selected?: boolean;
  link: Href;
}

export default function KIconButton(props: Props) {
  return (
    <Link href={props.link} asChild>
      <View style={{ ...styles.background, ...(props.selected ? { backgroundColor: Colors.light.primaryDark } : {}) }}>
        {props.children}
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  background: {
    paddingVertical: Physics.padding.small,
    paddingHorizontal: Physics.padding.medium,
    borderRadius: Physics.borderRadius.medium,
    ...Physics.shadow,
    elevation: Physics.elevation.medium,
    backgroundColor: '#fff'
  },
});
