import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import InputField from "@/components/ui/InputField";
import { Control } from "react-hook-form";
import { FormValues } from "@/app/product";

type Props = {
	control: Control<FormValues>;
	title: string;
};

export const ProductForm = ({ control, title }: Props) => (
	<View style={styles.container}>
		<ThemedText type="defaultSemiBold" style={styles.title}>
			{title}
		</ThemedText>
		<InputField
			label="Product Name"
			name="name"
			control={control}
			placeholder="Product Name"
		/>
		<InputField
			label="Description"
			name="description"
			control={control}
			placeholder="Description"
			multiline
		/>
		<InputField
			label="Quantity"
			name="quantity"
			control={control}
			placeholder="Quantity"
			keyboardType="numeric"
		/>
		<InputField
			label="Price"
			name="unitPrice"
			control={control}
			placeholder="Price"
			keyboardType="numeric"
		/>
		<InputField
			label="Image url"
			name="imageUrl"
			control={control}
			placeholder="Image url"
		/>
	</View>
);

const styles = StyleSheet.create({
	container: {
		padding: 32,
		marginHorizontal: -16,
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 12,
	},
});
