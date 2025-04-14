import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import InputField from "@/components/ui/InputField";
import { Control } from "react-hook-form";

type Props = {
	control: Control<any>;
	onSubmit: () => void;
	onDelete: () => void;
	loading: boolean;
};

export const ProductForm = ({ control, onSubmit, onDelete, loading }: Props) => (
	<View style={styles.container}>
		<ThemedText type="defaultSemiBold" style={styles.title}>
			Update Product
		</ThemedText>

		<InputField label="Product Name" name="name" control={control} placeholder="Product Name" />
		<InputField label="Description" name="description" control={control} placeholder="Description" multiline />
		<InputField label="Quantity" name="quantity" control={control} placeholder="Quantity" keyboardType="numeric" />
		<InputField label="Price" name="unitPrice" control={control} placeholder="Price" keyboardType="numeric" />

		<View style={styles.buttons}>
			<Pressable style={styles.deleteButton} onPress={onDelete} disabled={loading}>
				<ThemedText style={styles.buttonText}>Delete</ThemedText>
			</Pressable>
			<Pressable style={styles.updateButton} onPress={onSubmit} disabled={loading}>
				<ThemedText style={styles.buttonText}>Update</ThemedText>
			</Pressable>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#F9F9F9",
		padding: 32,
		marginHorizontal: -16,
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 12,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
	},
	deleteButton: {
		backgroundColor: "#FF3B30",
		borderRadius: 8,
		padding: 12,
		flex: 1,
		alignItems: "center",
	},
	updateButton: {
		backgroundColor: "#0A0A32",
		borderRadius: 8,
		padding: 12,
		flex: 1,
		alignItems: "center",
		marginLeft: 8,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "600",
	},
});
