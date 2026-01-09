import { ThemedText } from '@/components/themed-text';
import { FormInput } from '@/components/ui/Inputs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StepProps } from './types';

export default function Step6_EducationDetails({ form }: StepProps) {
    const { control } = form;

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>Educational Qualification</ThemedText>

            <FormInput
                control={control}
                name="educationDetails.lastInstitution"
                label="Name of Last Institution"
                rules={{ required: "Institution is required" }}
            />

            <FormInput
                control={control}
                name="educationDetails.boardUniversity"
                label="Board / University"
                rules={{ required: "Board is required" }}
            />

            <FormInput
                control={control}
                name="educationDetails.yearOfPassing"
                label="Year of Passing"
                keyboardType="numeric"
                rules={{ required: "Year is required" }}
            />

            <FormInput
                control={control}
                name="educationDetails.subjectsStudied"
                label="Subjects Studied"
                placeholder="e.g. Physics, Chemistry, Math"
                rules={{ required: "Subjects are required" }}
            />

            <FormInput
                control={control}
                name="educationDetails.marksPercentage"
                label="Overall Percentage / Grade"
                rules={{ required: "Marks are required" }}
            />

            <FormInput
                control={control}
                name="educationDetails.registerNumber"
                label="Register / Roll Number"
                rules={{ required: "Register Number is required" }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 16 },
    header: { marginBottom: 8 },
});
