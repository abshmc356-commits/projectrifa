import { useThemeColor } from '@/hooks/use-theme-color';
import { useApplication } from '@/hooks/useApplication';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Steps
import Step10_Submission from '@/components/application/Step10_Submission';
import Step1_CollegeInfo from '@/components/application/Step1_CollegeInfo';
import Step2_CourseDetails from '@/components/application/Step2_CourseDetails';
import Step3_PersonalDetails from '@/components/application/Step3_PersonalDetails';
import Step4_ContactDetails from '@/components/application/Step4_ContactDetails';
import Step5_ParentDetails from '@/components/application/Step5_ParentDetails';
import Step6_EducationDetails from '@/components/application/Step6_EducationDetails';
import Step7_Documents from '@/components/application/Step7_Documents';
import Step8_Declarations from '@/components/application/Step8_Declarations';

const STEPS_COUNT = 9; // merged 8&9

export default function ApplicationWizard() {
    const { step } = useLocalSearchParams();
    const currentStep = parseInt(step as string) || 1;
    const router = useRouter();
    const { application, saveDraft, submitApplication, saving } = useApplication();

    const form = useForm({
        defaultValues: application || {},
        mode: 'onBlur'
    });

    const { handleSubmit, reset, trigger } = form;

    // Sync form with loaded application data
    useEffect(() => {
        if (application) {
            reset(application);
        }
    }, [application]);

    // Handle Next
    const onNext = async () => {
        console.log("[UI] Save & Next Pressed");
        console.log("[UI] Triggering validation...");
        const isValid = await trigger();
        console.log("[UI] Validation Result:", isValid);

        if (!isValid) {
            console.log("[UI] Validation Errors:", form.formState.errors);
            return;
        }

        console.log("[UI] Validation passed, getting values...");
        const data = form.getValues();
        console.log("[UI] Calling saveDraft...", data);
        await saveDraft(data);
        console.log("[UI] saveDraft returned. Current Step:", currentStep);

        if (currentStep < STEPS_COUNT) {
            console.log(`[UI] Navigating to step ${currentStep + 1}`);
            router.push(`/application/${currentStep + 1}`);
        } else {
            // Last step -> Submit
            Alert.alert(
                "Confirm Submission",
                "Are you sure you want to submit? You cannot edit after this.",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Submit", onPress: () => {
                            submitApplication().then(() => {
                                router.replace('/application/success');
                            });
                        }
                    }
                ]
            );
        }
    };

    // Handle Back
    const onBack = () => {
        if (currentStep > 1) {
            router.back();
        } else {
            router.replace('/(tabs)');
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1_CollegeInfo form={form} />;
            case 2: return <Step2_CourseDetails form={form} />;
            case 3: return <Step3_PersonalDetails form={form} />;
            case 4: return <Step4_ContactDetails form={form} />;
            case 5: return <Step5_ParentDetails form={form} />;
            case 6: return <Step6_EducationDetails form={form} />;
            case 7: return <Step7_Documents form={form} />;
            case 8: return <Step8_Declarations form={form} />; // This covers 8 and 9
            case 9: return <Step10_Submission form={form} />; // Step 9 effectively acts as step 10 review
            default: return <Text>Step Not Found</Text>;
        }
    };

    const backgroundColor = useThemeColor({}, 'background');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor }}>
            <Stack.Screen options={{ title: `Step ${currentStep} of ${STEPS_COUNT}` }} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.content}>
                    {renderStep()}
                </ScrollView>

                <View style={[styles.footer, { backgroundColor }]}>
                    <TouchableOpacity onPress={onBack} style={[styles.btn, styles.backBtn]}>
                        <Text style={{ color: '#333' }}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onNext} style={[styles.btn, styles.nextBtn]} disabled={saving}>
                        {saving ? <ActivityIndicator color="#fff" /> :
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                {currentStep === STEPS_COUNT ? "Submit Application" : "Save & Next"}
                            </Text>
                        }
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: { padding: 20, paddingBottom: 100 },
    footer: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        flexDirection: 'row', padding: 16, backgroundColor: '#fff',
        borderTopWidth: 1, borderTopColor: '#eee',
        justifyContent: 'space-between'
    },
    btn: {
        paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, minWidth: 100, alignItems: 'center'
    },
    backBtn: { backgroundColor: '#f0f0f0' },
    nextBtn: { backgroundColor: '#007AFF' }
});
