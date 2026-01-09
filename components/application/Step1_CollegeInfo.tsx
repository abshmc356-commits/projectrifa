import { ThemedText } from '@/components/themed-text';
import { COLLEGES } from '@/constants/types';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StepProps } from './types';

export default function Step1_CollegeInfo({ form }: StepProps) {
    const college = COLLEGES[0];

    useEffect(() => {
        // Auto-fill form data even though read-only, so it saves to DB
        form.setValue('collegeInfo', {
            collegeName: college.name,
            address: college.address,
            contact: college.contact,
            academicYear: college.academicYear
        });
    }, []);

    const cardColor = useThemeColor({}, 'card');

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>College Information</ThemedText>

            <View style={styles.row}>
                <ThemedText type="defaultSemiBold">Name:</ThemedText>
                <ThemedText>{college.name}</ThemedText>
            </View>

            <View style={styles.row}>
                <ThemedText type="defaultSemiBold">Address:</ThemedText>
                <ThemedText>{college.address}</ThemedText>
            </View>

            <View style={styles.row}>
                <ThemedText type="defaultSemiBold">Academic Year:</ThemedText>
                <ThemedText>{college.academicYear}</ThemedText>
            </View>

            <View style={[styles.infoBox, { backgroundColor: cardColor }]}>
                <ThemedText style={{ fontSize: 12, fontStyle: 'italic' }}>
                    This information is auto-filled and cannot be changed.
                </ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 16 },
    header: { marginBottom: 8 },
    row: { marginBottom: 8 },
    infoBox: { padding: 12, backgroundColor: '#f0f0f0', borderRadius: 8, marginTop: 16 }
});
