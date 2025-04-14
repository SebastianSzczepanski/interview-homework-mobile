import React, { useEffect } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ScreenHeader } from "@/components/ScreenHeader";
import {
	useDeleteProductMutation,
	useGetWarehouseProductByIdQuery,
	useUpdateProductMutation,
} from "@/store/api/apiSlice";
import { ProductDetails } from "@/components/productDetails/ProductDetails";
import { ProductErrorState } from "@/components/productDetails/ProductErrorState";
import { ProductForm } from "@/components/productDetails/ProductForm";
import { ProductImage } from "@/components/productDetails/ProductImage";
import { ProductLoadingState } from "@/components/productDetails/ProductLoadingState";
import Button from "@/components/ui/Button";

export type FormValues = {
	name: string;
	description: string;
	quantity: string;
	unitPrice: string;
	imageUrl: string;
};

export default function Product() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();

	const { data: product, isLoading } = useGetWarehouseProductByIdQuery({
		id,
	});
	const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
	const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

	const { control, handleSubmit, reset } = useForm<FormValues>({
		defaultValues: {
			name: "",
			description: "",
			quantity: "",
			unitPrice: "",
			imageUrl: "",
		},
	});

	useEffect(() => {
		if (product) {
			reset({
				name: product.name,
				description: product.description,
				quantity: product.quantity?.toString(),
				unitPrice: product.unitPrice?.toString(),
				imageUrl: product.imageUrl,
			});
		}
	}, [product, reset]);

	const onSubmit = async (data: FormValues) => {
		if (!product) return;
		try {
			await updateProduct({
				id: product.id,
				...data,
				quantity: Number(data.quantity),
				unitPrice: Number(data.unitPrice),
			}).unwrap();

			Alert.alert(
				"Product Updated",
				"Your product has been updated successfully.",
			);
		} catch (error) {
			console.error("Update error:", error);
		}
	};

	const handleDelete = () => {
		Alert.alert("Delete Product", "Are you sure?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: async () => {
					if (!product) return;
					try {
						await deleteProduct({ id: product.id }).unwrap();
						Alert.alert("Deleted", "Product has been deleted.");
						router.back();
					} catch (err) {
						console.error("Delete error:", err);
					}
				},
			},
		]);
	};

	if (isLoading) return <ProductLoadingState />;
	if (!product) return <ProductErrorState onBack={router.back} />;

	const productMutationLoading = updating || deleting;
	
	return (
		<>
			<ScreenHeader title="Product Details" />
			<SafeAreaView style={styles.container}>
				<KeyboardAwareScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
					keyboardShouldPersistTaps="handled"
				>
					<ProductImage uri={product.imageUrl} />
					<ProductDetails product={product} />
					<ProductForm control={control} title="Update product" />

					<View style={styles.buttons}>
						<Button
							onPress={handleDelete}
							disabled={productMutationLoading}
							title="Delete"
							style={styles.deleteButton}
							loading={productMutationLoading}
							variant="secondary"
						/>
						<Button
							onPress={handleSubmit(onSubmit)}
							disabled={productMutationLoading}
							title="Update"
							style={styles.updateButton}
							loading={productMutationLoading}
						/>
					</View>
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
	buttons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
		paddingHorizontal: 16,
	},
	deleteButton: {
		flex: 1,
	},
	updateButton: {
		flex: 1,
		marginLeft: 8,
	},
});
