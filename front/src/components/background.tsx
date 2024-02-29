import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/colors';
import Physics from '../constants/physics';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
}

// convert number to string with %
const toStr = (n: number) => `${n}%`;
// gen random string between min and max
const [min, max] = [20, 80];
// make repartition of stars more even
const randStr = () => toStr(Math.random() * (max - min) + min);

const generatePosition = () => {
    const position = {
        top: '',
        left: '',
        bottom: '',
        right: '',
    };
    // gen random position
    var random = Math.random();
    if (random < 0.25) {
        position.top = randStr();
        position.left = randStr();
    } else if (random < 0.5) {
        position.bottom = randStr();
        position.right = randStr();
    } else if (random < 0.75) {
        position.top = randStr();
        position.right = randStr();
    } else {
        position.bottom = randStr();
        position.left = randStr();
    }
    return position;
}

export default function KBackground(props: Props) {
    return (
        <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[Colors.light.primaryDark, Colors.light.primary]}
            style={styles.background}>
            {/* fill array with positions */}
            {Array(25).fill(0).map((_, i) => {
                const position = generatePosition();
                return (
                    <Ionicons
                        key={i}
                        name="star"
                        size={Physics.icon.small}
                        color={Colors.light.primaryDark}
                        style={{
                            ...styles.icon,
                            ...position
                        }}
                    />
                );
            })}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        width: '100%',
    },
    icon: {
        position: 'absolute',
    }
});
