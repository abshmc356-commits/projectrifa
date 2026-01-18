import { useThemeColor } from '@/hooks/use-theme-color';
import { useApplication } from '@/hooks/useApplication';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// ... Imports for Steps ...
// (Assuming these imports are correct in your file)
import Step10_Submission from '@/components/application/Step10_Submission';
import Step1_CollegeInfo from '@/components/application/Step1_CollegeInfo';
import Step2_CourseDetails from '@/components/application/Step2_CourseDetails';
import Step3_PersonalDetails from '@/components/application/Step3_PersonalDetails';
import Step4_ContactDetails from '@/components/application/Step4_ContactDetails';
import Step5_ParentDetails from '@/components/application/Step5_ParentDetails';
import Step6_EducationDetails from '@/components/application/Step6_EducationDetails';
import Step7_Documents from '@/components/application/Step7_Documents';
import Step8_Declarations from '@/components/application/Step8_Declarations';

const STEPS_COUNT = 9;

export default function ApplicationWizard() {
    const { step } = useLocalSearchParams();
    const currentStep = parseInt(step as string) || 1;
    const router = useRouter();
    const { application, saveDraft, submitApplication, saving } = useApplication();
    const insets = useSafeAreaInsets();

    const form = useForm({
        defaultValues: application || {},
        mode: 'onBlur'
    });

    const { handleSubmit, reset, trigger } = form;

    useEffect(() => {
        if (application) {
            reset(application);
        }
    }, [application]);

    const onNext = async () => {
        // ... (Your existing validation and next logic) ...
        const isValid = await trigger();
        if (!isValid) return;

        const data = form.getValues();
        await saveDraft(data);

        if (currentStep < STEPS_COUNT) {
            router.push(`/application/${currentStep + 1}`);
        } else {
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
            case 8: return <Step8_Declarations form={form} />;
            case 9: return <Step10_Submission form={form} />;
            default: return <Text>Step Not Found</Text>;
        }
    };

    const backgroundColor = useThemeColor({}, 'background');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor }} edges={['top', 'left', 'right']}>
            <Stack.Screen options={{ title: `Step ${currentStep} of ${STEPS_COUNT}` }} />

            {/* FIX 2: Changed behavior to 'padding' for both platforms. 
         If Android still acts up, try changing behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    {renderStep()}
                </ScrollView>

                {/* Footer */}
                <View style={[
                    styles.footer,
                    {
                        backgroundColor,
                        // Ensure we respect bottom inset, but add padding if inset is 0 (some Androids)
                        paddingBottom: Math.max(insets.bottom, 16)
                    }
                ]}>
                    <TouchableOpacity
                        onPress={onBack}
                        style={[styles.btn, styles.backBtn]}
                    >
                        <Text style={{ color: '#333' }}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onNext}
                        style={[styles.btn, styles.nextBtn]}
                        disabled={saving}
                    >
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
    content: { padding: 20 },
    footer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        justifyContent: 'space-between',
        alignItems: 'center', // Ensures buttons align vertically center
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 24, // Keep padding, but...
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // FIX 1: Prevent shrinking and ensure minimum width
        flexShrink: 0,
        minWidth: 100,
    },
    backBtn: { backgroundColor: '#f0f0f0' },
    nextBtn: { backgroundColor: '#007AFF' }
});