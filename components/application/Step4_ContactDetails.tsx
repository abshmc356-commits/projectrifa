import { ThemedText } from '@/components/themed-text';
import { FormInput } from '@/components/ui/Inputs';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StepProps } from './types';

export default function Step4_ContactDetails({ form }: StepProps) {
    const { control, watch, setValue } = form;
    const isSame = watch('contactDetails.isSameAddress');
    const permAddress = watch('contactDetails.permanentAddress');

    useEffect(() => {
        if (isSame && permAddress) {
            setValue('contactDetails.correspondenceAddress', permAddress);
        }
    }, [isSame, permAddress]);

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>Contact Details</ThemedText>

            <FormInput
                control={control}
                name="contactDetails.mobileNumber"
                label="Mobile Number"
                keyboardType="phone-pad"
                rules={{
                    required: "Mobile is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile number" }
                }}
            />

            <FormInput
                control={control}
                name="contactDetails.email"
                label="Email ID"
                keyboardType="email-address"
                rules={{
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
                }}
            />

            <FormInput
                control={control}
                name="contactDetails.permanentAddress"
                label="Permanent Address"
                multiline
                rules={{ required: "Permanent Address is required" }}
            />

            <Controller
                control={control}
                name="contactDetails.isSameAddress"
                render={({ field: { value, onChange } }) => (
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => onChange(!value)}
                    >
                        <Ionicons name={value ? "checkbox" : "square-outline"} size={24} color="#007AFF" />
                        <ThemedText style={styles.checkboxLabel}>Same as Permanent Address</ThemedText>
                    </TouchableOpacity>
                )}
            />

            <FormInput
                control={control}
                name="contactDetails.correspondenceAddress"
                label="Correspondence Address"
                multiline
                editable={!isSame}
                rules={{ required: "Correspondence Address is required" }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 16 },
    header: { marginBottom: 8 },
    checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    checkboxLabel: { marginLeft: 8, fontSize: 16 }
});
