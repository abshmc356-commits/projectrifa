import { ThemedText } from '@/components/themed-text';
import { FormInput } from '@/components/ui/Inputs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StepProps } from './types';

export default function Step5_ParentDetails({ form }: StepProps) {
    const { control } = form;

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>Parent / Guardian Details</ThemedText>

            <FormInput
                control={control}
                name="parentDetails.fatherName"
                label="Father's Name"
                rules={{ required: "Father's Name is required" }}
            />

            <FormInput
                control={control}
                name="parentDetails.motherName"
                label="Mother's Name"
                rules={{ required: "Mother's Name is required" }}
            />

            <FormInput
                control={control}
                name="parentDetails.guardianName"
                label="Guardian's Name (if applicable)"
            />

            <FormInput
                control={control}
                name="parentDetails.occupation"
                label="Parent's Occupation"
                rules={{ required: "Occupation is required" }}
            />

            <FormInput
                control={control}
                name="parentDetails.contactNumber"
                label="Parent's Contact Number"
                keyboardType="phone-pad"
                rules={{ required: "Contact Number is required" }}
            />

            <FormInput
                control={control}
                name="parentDetails.annualIncome"
                label="Annual Income (Optional)"
                keyboardType="numeric"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 16 },
    header: { marginBottom: 8 },
});
