import React from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ScreenHeader } from "@/components/ScreenHeader";
import { useCreateProductMutation } from "@/store/api/apiSlice";

import { ProductForm } from "@/components/ProductForm";

import Button from "@/components/ui/Button";

export type FormValues = {
	name: string;
	description: string;
	quantity: string;
	unitPrice: string;
	imageUrl: string;
};

export default function CreateProduct() {
	const [createProduct, { isLoading }] = useCreateProductMutation();

	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			name: "",
			description: "",
			quantity: "",
			unitPrice: "",
			imageUrl: "",
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			await createProduct({
				...data,
				quantity: Number(data.quantity),
				unitPrice: Number(data.unitPrice),
			}).unwrap();
			Alert.alert("Success", "Product created successfully");
		} catch (error) {
			console.error("Error creating product:", error);
			Alert.alert("Error", "Failed to create product");
		}
	};

	return (
		<>
			<ScreenHeader title="Create new product form" />
			<SafeAreaView style={styles.container}>
				<KeyboardAwareScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
					keyboardShouldPersistTaps="handled"
				>
					<ProductForm control={control} title="Create product" />
					<Button
						onPress={handleSubmit(onSubmit)}
						disabled={isLoading}
						title="Create Product"
						style={styles.addButton}
						loading={isLoading}
					/>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	addButton: {
		marginHorizontal: 16,
	},
});
