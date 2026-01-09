import { FormInput } from '@/components/ui/Inputs';
import { auth } from '@/config/firebase';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const { control, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onLogin = async (data: any) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            // Navigation handled by _layout.tsx based on auth state
        } catch (error: any) {
            let msg = error.message;
            if (error.code === 'auth/invalid-credential') msg = "Invalid email or password.";
            Alert.alert("Login Failed", msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Student Portal</Text>
                <Text style={styles.subtitle}>Sign in to continue your application</Text>

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
                    placeholder="••••••"
                    secureTextEntry
                    rules={{ required: 'Password is required' }}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onLogin)}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Log In</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <Link href="/(auth)/register" asChild>
                        <TouchableOpacity>
                            <Text style={styles.link}>Register</Text>
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
        backgroundColor: '#007AFF', // You can change this to match your theme
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
