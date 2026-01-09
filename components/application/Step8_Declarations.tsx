import { ThemedText } from '@/components/themed-text';
import { FormInput } from '@/components/ui/Inputs';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StepProps } from './types';

export default function Step8_Declaration({ form }: StepProps) {
    const { control } = form;
    const date = new Date().toLocaleDateString();

    const cardColor = useThemeColor({}, 'card');

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>Declarations</ThemedText>

            {/* Applicant Declaration */}
            <View style={[styles.section, { backgroundColor: cardColor }]}>
                <ThemedText type="defaultSemiBold">Applicant's Declaration</ThemedText>
                <ThemedText style={styles.legalText}>
                    I hereby declare that all the information provided by me in this application is true and correct to the best of my knowledge and belief. I understand that any misrepresentation or omission of facts will justify the denial of admission or cancellation of admission.
                </ThemedText>

                <Controller
                    control={control}
                    name="declarations.applicantAgreed"
                    rules={{ required: "You must agree to the declaration" }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <View>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => onChange(!value)}
                            >
                                <Ionicons name={value ? "checkbox" : "square-outline"} size={24} color="#007AFF" />
                                <Text style={styles.checkboxLabel}>I Agree</Text>
                            </TouchableOpacity>
                            {error && <Text style={{ color: 'red' }}>Required</Text>}
                        </View>
                    )}
                />

                <FormInput
                    control={control}
                    name="declarations.applicantSigned"
                    label="Digital Signature (Type Full Name)"
                    placeholder="Applicant Name"
                    rules={{ required: "Signature required" }}
                />
            </View>

            {/* Parent Declaration */}
            <View style={[styles.section, { backgroundColor: cardColor }]}>
                <ThemedText type="defaultSemiBold">Parent / Guardian's Declaration</ThemedText>
                <ThemedText style={styles.legalText}>
                    I have read the rules and regulations of the college and agree to abide by them. I will be responsible for my ward's conduct and payment of fees.
                </ThemedText>

                <Controller
                    control={control}
                    name="declarations.parentAgreed"
                    rules={{ required: "Parent must agree" }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <View>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => onChange(!value)}
                            >
                                <Ionicons name={value ? "checkbox" : "square-outline"} size={24} color="#007AFF" />
                                <Text style={styles.checkboxLabel}>I Agree</Text>
                            </TouchableOpacity>
                            {error && <Text style={{ color: 'red' }}>Required</Text>}
                        </View>
                    )}
                />

                <FormInput
                    control={control}
                    name="declarations.parentSigned"
                    label="Parent's Digital Signature (Type Full Name)"
                    placeholder="Parent/Guardian Name"
                    rules={{ required: "Parent Signature required" }}
                />

                <FormInput
                    control={control}
                    name="declarations.place"
                    label="Place"
                    rules={{ required: "Place is required" }}
                />

                <Text style={{ marginTop: 10 }}>Date: {date}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 24 },
    header: { marginBottom: 8 },
    section: { padding: 16, borderRadius: 8, gap: 12 },
    legalText: { fontSize: 14, fontStyle: 'italic', lineHeight: 20 },
    checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    checkboxLabel: { marginLeft: 8, fontSize: 16, fontWeight: '600' }
});
