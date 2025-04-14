import React from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useColorScheme } from "@/hooks/useColorScheme";
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

type FormData = {
	name: string;
	description: string;
	quantity: string;
	unitPrice: string;
};

export default function Product() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const theme = useColorScheme() ?? "light";

	const { data: product, isLoading } = useGetWarehouseProductByIdQuery({
		id,
	});
	const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
	const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			name: product?.name || "",
			description: product?.description || "",
			quantity: product?.quantity?.toString() || "",
			unitPrice: product?.unitPrice?.toString() || "",
		},
	});

	const onSubmit = async (data: FormData) => {
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
					<ProductForm
						control={control}
						onSubmit={handleSubmit(onSubmit)}
						onDelete={handleDelete}
						loading={updating || deleting}
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
});
