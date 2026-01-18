import { useThemeColor } from '@/hooks/use-theme-color';
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
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
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
        borderRadius: 8,
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
    const backgroundColor = useThemeColor({}, 'card');
    const textColor = useThemeColor({}, 'text');
    const borderColor = useThemeColor({}, 'icon');
    const placeholderColor = useThemeColor({}, 'icon');

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    {label && <ThemedText type="defaultSemiBold" style={styles.label}>{label}</ThemedText>}
                    <TextInput
                        style={[
                            styles.input,
                            { backgroundColor, color: textColor, borderColor: error ? 'red' : borderColor },
                            !editable && { opacity: 0.7 }
                        ]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        editable={editable}
                        multiline={multiline}
                        placeholderTextColor={placeholderColor}
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
    const backgroundColor = useThemeColor({}, 'card');
    const textColor = useThemeColor({}, 'text');
    const borderColor = useThemeColor({}, 'icon');

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    {label && <ThemedText type="defaultSemiBold" style={styles.label}>{label}</ThemedText>}
                    <View style={[
                        styles.pickerContainer,
                        { backgroundColor, borderColor: error ? 'red' : borderColor }
                    ]}>
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            enabled={enabled}
                            style={Platform.OS === 'android' ? { height: 50, width: '100%', color: textColor } : {}}
                            itemStyle={{ color: textColor }}
                            dropdownIconColor={textColor}
                        >
                            <Picker.Item label="Select..." value="" color={borderColor} />
                            {items.map((item) => (
                                <Picker.Item key={item.value} label={item.label} value={item.value} color={textColor} />
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
    const backgroundColor = useThemeColor({}, 'card');
    const textColor = useThemeColor({}, 'text');
    const borderColor = useThemeColor({}, 'icon');
    const placeholderColor = useThemeColor({}, 'icon');

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
                            style={[
                                styles.input,
                                { backgroundColor, borderColor: error ? 'red' : borderColor, justifyContent: 'center' }
                            ]}
                        >
                            <ThemedText style={{ color: value ? textColor : placeholderColor }}>
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
