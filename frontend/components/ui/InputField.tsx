import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useController, Control } from "react-hook-form";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface InputFieldProps {
	name: string;
	control: Control<any>;
	placeholder?: string;
	defaultValue?: string;
	multiline?: boolean;
	keyboardType?: "default" | "numeric" | "email-address";
	label: string;
}

const InputField: React.FC<InputFieldProps> = ({
	name,
	control,
	placeholder,
	defaultValue = "",
	multiline = false,
	keyboardType = "default",
	label,
}) => {
	const {
		field: { onChange, onBlur, value },
		fieldState: { error },
	} = useController({
		name,
		control,
		defaultValue,
	});
	return (
		<View style={styles.inputContainer}>
			<ThemedText
				type="defaultSemiBold"
				lightColor={Colors.light.text}
				darkColor={Colors.dark.text}
			>
				{label}
			</ThemedText>
			<TextInput
				style={[styles.input, error && styles.errorInput]}
				placeholder={placeholder}
				value={value}
				onBlur={onBlur}
				onChangeText={onChange}
				multiline={multiline}
				keyboardType={keyboardType}
			/>
			{error && (
				<ThemedText style={styles.errorText}>
					{error.message}
				</ThemedText>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		marginBottom: 12,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 4,
		padding: 10,
		backgroundColor: "white",
	},
	errorInput: {
		borderColor: "#FF3B30",
	},
	errorText: {
		color: "#FF3B30",
		marginTop: 4,
	},
});

export default InputField;
