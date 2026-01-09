import { Platform, StyleSheet, View } from 'react-native';

export default function TabBarBackground() {
    return (
        <View
            style={[
                StyleSheet.absoluteFill,
                { backgroundColor: Platform.select({ ios: 'transparent', default: 'white' }) },
            ]}
        />
    );
}

export function useBottomTabOverflow() {
    return 0;
}
