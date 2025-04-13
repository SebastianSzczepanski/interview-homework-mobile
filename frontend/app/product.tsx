import {
	View,
	StyleSheet,
	ActivityIndicator,
	Image,
	Pressable,
	Alert,
	SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";

import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import {
	useDeleteProductMutation,
	useGetWarehouseProductByIdQuery,
	useUpdateProductMutation,
} from "@/store/api/apiSlice";
import InputField from "@/components/ui/InputField";
import { formatCurrency } from "@/utils/formatCurrency";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
	const [updateProductRequest, { isLoading: updateIsLoading }] =
		useUpdateProductMutation();
	const [deleteProductRequest, { isLoading: deleteIsLoading }] =
		useDeleteProductMutation();

	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			name: product?.name || "",
			description: product?.description || "",
			quantity: product?.quantity.toString() || "",
			unitPrice: product?.unitPrice.toString() || "",
		},
	});

	const onSubmit = async (data: FormData) => {
		try {
			if (!product) return;
			await updateProductRequest({
				...data,
				quantity: Number(data.quantity),
				unitPrice: Number(product.unitPrice),
				id: product.id,
			}).unwrap();
			Alert.alert(
				"Product Updated",
				"Your product has been updated successfully.",
			);
		} catch (error) {
			console.error("Error updating product:", error);
		}
	};

	const handleDeleteRequest = async () => {
		try {
			if (!product) return;

			await deleteProductRequest({ id: product.id }).unwrap();
			Alert.alert(
				"Delete Product",
				"Are you sure you want to delete this product?",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Delete",
						style: "destructive",
						onPress: () => {
							Alert.alert(
								"Product Deleted",
								"The product has been deleted.",
							);
							router.back();
						},
					},
				],
			);
		} catch (error) {}
	};

	const handleDelete = () => {
		Alert.alert(
			"Delete Product",
			"Are you sure you want to delete this product?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: handleDeleteRequest,
				},
			],
		);
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={Colors[theme].text} />
			</View>
		);
	}

	if (!product) {
		return (
			<View style={styles.errorContainer}>
				<ThemedText type="defaultSemiBold">
					Product not found
				</ThemedText>
				<Pressable
					style={styles.backButton}
					onPress={router.back}
				>
					<ThemedText>Go Back</ThemedText>
				</Pressable>
			</View>
		);
	}

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "Product Details",
					headerLeft: () => (
						<Pressable
							onPress={router.back}
							style={styles.backIcon}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color={Colors[theme].text}
							/>
						</Pressable>
					),
				}}
			/>
			<SafeAreaView style={styles.container}>
				<KeyboardAwareScrollView
					style={{ flexGrow: 1 }}
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
					keyboardShouldPersistTaps="handled"
				>
					<View style={styles.imageContainer}>
						<Image
							source={{ uri: product.imageUrl }}
							style={styles.productImage}
							resizeMode="center"
						/>
					</View>

					<View style={styles.detailsContainer}>
						<ThemedText
							type="defaultSemiBold"
							style={styles.productName}
						>
							{product.name}
						</ThemedText>
						<View style={styles.priceContainer}>
							<ThemedText
								type="defaultSemiBold"
								style={styles.price}
							>
								{formatCurrency(product.unitPrice)}
							</ThemedText>
							<ThemedText style={styles.quantity}>
								Available: {product.quantity}
							</ThemedText>
						</View>
						<ThemedText style={styles.sectionTitle}>
							Description
						</ThemedText>
						<ThemedText style={styles.description}>
							{product.description}
						</ThemedText>
					</View>
					<View style={styles.formContainer}>
						<ThemedText
							type="defaultSemiBold"
							style={styles.formTitle}
						>
							Update Product
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
						<View style={styles.buttonRow}>
							<Pressable
								style={styles.deleteButton}
								onPress={handleDelete}
								disabled={deleteIsLoading || updateIsLoading}
							>
								<ThemedText style={styles.buttonText}>
									Delete
								</ThemedText>
							</Pressable>
							<Pressable
								style={styles.updateButton}
								onPress={handleSubmit(onSubmit)}
								disabled={deleteIsLoading || updateIsLoading}
							>
								<ThemedText style={styles.buttonText}>
									Update
								</ThemedText>
							</Pressable>
						</View>
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
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	backButton: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#f0f0f0",
		borderRadius: 5,
	},
	backIcon: {
		padding: 8,
	},
	imageContainer: {
		height: 300,
		width: "100%",
	},
	productImage: {
		width: "100%",
		height: "100%",
	},
	detailsContainer: {
		padding: 16,
	},
	productName: {
		fontSize: 24,
		marginBottom: 12,
	},
	priceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	price: {
		fontSize: 22,
		color: "#0A0A32",
	},
	quantity: {
		fontSize: 16,
		color: "#666",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginTop: 16,
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
	},
	formContainer: {
		marginBottom: 16,
		backgroundColor: "#F9F9F9",
		padding: 32,
		marginHorizontal: -16,
	},
	formTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 12,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
	},
	updateButton: {
		backgroundColor: "#0A0A32",
		borderRadius: 8,
		padding: 12,
		flex: 1,
		marginLeft: 8,
		alignItems: "center",
	},
	deleteButton: {
		backgroundColor: "#FF3B30",
		borderRadius: 8,
		padding: 12,
		flex: 1,
		alignItems: "center",
	},
	addToCartButton: {
		backgroundColor: "#007AFF",
		padding: 16,
		margin: 16,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "600",
	},
});
