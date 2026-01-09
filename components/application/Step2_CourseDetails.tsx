import { ThemedText } from '@/components/themed-text';
import { FormInput, FormSelect } from '@/components/ui/Inputs';
import { PROGRAMS } from '@/constants/types';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StepProps } from './types';

export default function Step2_CourseDetails({ form }: StepProps) {
    const { control, watch, setValue } = form;
    const programName = watch('courseDetails.programName');

    useEffect(() => {
        if (programName) {
            const selected = PROGRAMS.find(p => p.name === programName);
            if (selected) {
                setValue('courseDetails.department', selected.department);
                setValue('courseDetails.level', selected.level);
                setValue('courseDetails._duration', selected.duration); // Metadata only
            }
        }
    }, [programName]);

    const programOptions = PROGRAMS.map(p => ({ label: p.name, value: p.name }));

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>Course Details</ThemedText>

            <FormSelect
                control={control}
                name="courseDetails.programName"
                label="Program Applied For"
                items={programOptions}
                rules={{ required: "Program is required" }}
            />

            <FormInput
                control={control}
                name="courseDetails.department"
                label="Department"
            />

            <FormSelect
                control={control}
                name="courseDetails.level"
                label="Level"
                enabled={false}
                items={[
                    { label: 'UG', value: 'UG' },
                    { label: 'PG', value: 'PG' },
                    { label: 'Diploma', value: 'Diploma' }
                ]}
            />

            <FormSelect
                control={control}
                name="courseDetails.mediumOfInstruction"
                label="Medium of Instruction"
                items={[
                    { label: 'English', value: 'English' },
                    { label: 'Kannada', value: 'Kannada' }
                ]}
                rules={{ required: "Medium is required" }}
            />

            <FormSelect
                control={control}
                name="courseDetails.mode"
                label="Mode of Study"
                items={[
                    { label: 'Regular', value: 'Regular' },
                    { label: 'Distance', value: 'Distance' }
                ]}
                rules={{ required: "Mode is required" }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 16 },
    header: { marginBottom: 8 },
});
