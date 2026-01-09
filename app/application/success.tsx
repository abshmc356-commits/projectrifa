import { ThemedText } from '@/components/themed-text';
import { useApplication } from '@/hooks/useApplication';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SubmissionSuccess() {
    const { application } = useApplication();
    const router = useRouter();

    if (!application || application.status !== 'submitted') {
        // Fallback if accessed directly
        return (
            <View style={styles.container}>
                <Text>Loading or Invalid State...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
                <ThemedText type="title" style={styles.title}>Application Submitted!</ThemedText>
                <Text style={styles.subtitle}>
                    Your application has been successfully submitted for review.
                </Text>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Application Number</Text>
                        <Text style={styles.value}>{application.officeUse?.applicationNumber}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Submission Date</Text>
                        <Text style={styles.value}>
                            {application.officeUse?.submissionDate
                                ? new Date(application.officeUse.submissionDate).toLocaleDateString()
                                : 'Just now'}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Status</Text>
                        <Text style={[styles.value, { color: '#FFA500' }]}>Under Review</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => router.push('/(tabs)')}
                >
                    <Text style={styles.btnText}>Back to Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => router.push('/application/1')}
                >
                    <Text style={[styles.btnText, { color: '#007AFF' }]}>View Application</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
    title: { marginTop: 16, marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 32 },
    card: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 32
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    label: { color: '#666', fontSize: 16 },
    value: { fontWeight: 'bold', fontSize: 16 },
    primaryBtn: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16
    },
    secondaryBtn: {
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center'
    },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
