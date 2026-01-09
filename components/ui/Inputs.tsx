import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed-text';

// Basic styles
const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden', // for iOS picker radius
    },
});

interface FormInputProps {
    control: any;
    name: string;
    label?: string;
    placeholder?: string;
    rules?: any;
    secureTextEntry?: boolean;
    keyboardType?: any;
    editable?: boolean;
    multiline?: boolean;
}

export const FormInput = ({ control, name, label, placeholder, rules, secureTextEntry, keyboardType, editable = true, multiline = false }: FormInputProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    {label && <ThemedText type="defaultSemiBold" style={styles.label}>{label}</ThemedText>}
                    <TextInput
                        style={[styles.input, error && styles.inputError, !editable && { backgroundColor: '#f0f0f0', color: '#666' }]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        editable={editable}
                        multiline={multiline}
                        placeholderTextColor="#999"
                    />
                    {error && <Text style={styles.errorText}>{error.message || 'Required'}</Text>}
                </View>
            )}
        />
    );
};

interface FormSelectProps {
    control: any;
    name: string;
    label?: string;
    items: { label: string; value: string }[];
    rules?: any;
    enabled?: boolean;
}

export const FormSelect = ({ control, name, label, items, rules, enabled = true }: FormSelectProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    {label && <ThemedText type="defaultSemiBold" style={styles.label}>{label}</ThemedText>}
                    <View style={[styles.pickerContainer, error && styles.inputError]}>
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            enabled={enabled}
                            style={Platform.OS === 'android' ? { height: 50, width: '100%' } : {}}
                        >
                            <Picker.Item label="Select..." value="" color="#999" />
                            {items.map((item) => (
                                <Picker.Item key={item.value} label={item.label} value={item.value} />
                            ))}
                        </Picker>
                    </View>
                    {error && <Text style={styles.errorText}>{error.message || 'Required'}</Text>}
                </View>
            )}
        />
    );
};

interface DatePickerProps {
    control: any;
    name: string;
    label: string;
    rules?: any;
}

export const DatePickerInput = ({ control, name, label, rules }: DatePickerProps) => {
    const [show, setShow] = React.useState(false);

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const dateValue = value ? new Date(value) : new Date();

                const onChangeDate = (event: any, selectedDate?: Date) => {
                    setShow(Platform.OS === 'ios');
                    if (selectedDate) {
                        onChange(selectedDate.toISOString());
                    }
                };

                return (
                    <View style={styles.container}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{label}</ThemedText>
                        <TouchableOpacity
                            onPress={() => setShow(true)}
                            style={[styles.input, error && styles.inputError, { justifyContent: 'center' }]}
                        >
                            <ThemedText style={{ color: value ? '#000' : '#999' }}>
                                {value ? new Date(value).toLocaleDateString() : 'Select Date'}
                            </ThemedText>
                        </TouchableOpacity>

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dateValue}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDate}
                            />
                        )}
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                );
            }}
        />
    );
};
