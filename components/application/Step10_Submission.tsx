import { ThemedText } from '@/components/themed-text';
import { ApplicationData } from '@/constants/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StepProps } from './types';

export default function Step10_Review({ form }: StepProps) {
    const values = form.getValues() as ApplicationData;
    // In a real app, we would print out a summary here.
    // For now, simple text.

    const cardColor = useThemeColor({}, 'card');

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>Review & Submit</ThemedText>

            <View style={styles.infoBox}>
                <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
                <Text style={styles.infoText}>
                    Please review all details carefully. Once submitted, you cannot edit the application.
                </Text>
            </View>

            <View style={{ gap: 12 }}>
                <ThemedText style={styles.label}>Name: <ThemedText type="defaultSemiBold">{values.personalDetails?.fullName}</ThemedText></ThemedText>
                <ThemedText style={styles.label}>Course: <ThemedText type="defaultSemiBold">{values.courseDetails?.programName}</ThemedText></ThemedText>
                <ThemedText style={styles.label}>Mobile: <ThemedText type="defaultSemiBold">{values.contactDetails?.mobileNumber}</ThemedText></ThemedText>
            </View>

            <ThemedText style={{ marginTop: 20, fontStyle: 'italic' }}>
                (Click "Previous" to edit any details if needed)
            </ThemedText>
        </View>
    );
}

import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: { gap: 16 },
    header: { marginBottom: 8 },
    infoBox: { flexDirection: 'row', padding: 16, backgroundColor: '#e3f2fd', borderRadius: 8, alignItems: 'center', gap: 10 },
    infoText: { flex: 1, color: '#0d47a1' },
    label: { fontSize: 16, marginTop: 8 },
});
