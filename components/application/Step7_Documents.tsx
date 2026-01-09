import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StepProps } from './types';

const CheckboxItem = ({ control, name, label }: { control: any; name: string; label: string }) => (
    <Controller
        control={control}
        name={`documentsSubmitted.${name}`}
        defaultValue={false}
        render={({ field: { value, onChange } }) => (
            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => onChange(!value)}
            >
                <Ionicons
                    name={value ? "checkbox" : "square-outline"}
                    size={24}
                    color={value ? "#007AFF" : "#666"}
                />
                <ThemedText style={styles.checkboxLabel}>{label}</ThemedText>
            </TouchableOpacity>
        )}
    />
);

export default function Step7_Documents({ form }: StepProps) {
    const { control } = form;

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>Documents Submitted</ThemedText>
            <ThemedText style={styles.subHeader}>Please verify the documents you are submitting.</ThemedText>

            <CheckboxItem control={control} name="transferCertificate" label="Transfer Certificate (TC)" />
            <CheckboxItem control={control} name="markSheets" label="10th / 12th Mark Sheets" />
            <CheckboxItem control={control} name="idProof" label="Aadhaar / ID Proof" />
            <CheckboxItem control={control} name="communityCertificate" label="Community Certificate (if applicable)" />
            <CheckboxItem control={control} name="incomeCertificate" label="Income Certificate (if applicable)" />
            <CheckboxItem control={control} name="photos" label="Passport Size Photos" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 16 },
    header: { marginBottom: 8 },
    subHeader: { marginBottom: 16, fontSize: 14, color: '#666' },
    checkboxContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    checkboxLabel: { marginLeft: 12, fontSize: 16 }
});
