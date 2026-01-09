import { ThemedText } from '@/components/themed-text';
import { DatePickerInput, FormInput, FormSelect } from '@/components/ui/Inputs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StepProps } from './types';

export default function Step3_PersonalDetails({ form }: StepProps) {
    const { control } = form;

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>Personal Details</ThemedText>

            <FormInput
                control={control}
                name="personalDetails.fullName"
                label="Full Name (as per Marks Card)"
                placeholder="Enter full name"
                rules={{ required: "Full Name is required" }}
            />

            <DatePickerInput
                control={control}
                name="personalDetails.dateOfBirth"
                label="Date of Birth"
                rules={{ required: "DOB is required" }}
            />

            <FormSelect
                control={control}
                name="personalDetails.gender"
                label="Gender"
                items={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' }
                ]}
                rules={{ required: "Gender is required" }}
            />

            <FormInput
                control={control}
                name="personalDetails.nationality"
                label="Nationality"
                placeholder="e.g. Indian"
                rules={{ required: "Nationality is required" }}
            />

            <FormInput
                control={control}
                name="personalDetails.religion"
                label="Religion"
                placeholder="e.g. Hindu, Muslim, Christian"
            />

            <FormInput
                control={control}
                name="personalDetails.community"
                label="Community"
            />

            <FormSelect
                control={control}
                name="personalDetails.category"
                label="Category"
                items={[
                    { label: 'General', value: 'General' },
                    { label: 'OBC', value: 'OBC' },
                    { label: 'SC', value: 'SC' },
                    { label: 'ST', value: 'ST' }
                ]}
                rules={{ required: "Category is required" }}
            />

            <FormInput
                control={control}
                name="personalDetails.aadhaarNumber"
                label="Aadhaar / ID Number"
                keyboardType="numeric"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 16 },
    header: { marginBottom: 8 },
});
