import { FormInput } from '@/components/ui/Inputs';
import { auth } from '@/config/firebase';
import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
    const { control, handleSubmit, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pwd = watch('password');

    const onRegister = async (data: any) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            // Navigation handled by user state change
        } catch (error: any) {
            let msg = error.message;
            if (error.code === 'auth/email-already-in-use') msg = "Email already in use.";
            Alert.alert("Registration Failed", msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Start your admission process</Text>

                <FormInput
                    control={control}
                    name="email"
                    label="Email Address"
                    placeholder="student@example.com"
                    rules={{
                        required: 'Email is required',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
                    }}
                    keyboardType="email-address"
                />

                <FormInput
                    control={control}
                    name="password"
                    label="Password"
                    placeholder="Min 6 characters"
                    secureTextEntry
                    rules={{
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    }}
                />

                <FormInput
                    control={control}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Re-enter password"
                    secureTextEntry
                    rules={{
                        required: 'Please confirm password',
                        validate: (value: string) => value === pwd || "Passwords do not match"
                    }}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onRegister)}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <Link href="/(auth)/login" asChild>
                        <TouchableOpacity>
                            <Text style={styles.link}>Log In</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    footerText: {
        color: '#666',
    },
    link: {
        color: '#007AFF',
        fontWeight: '600',
    },
});
