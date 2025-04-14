import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { formatCurrency } from "@/utils/formatCurrency";
import { WarehouseItem } from "@/models/WarehouseItem";

type Props = {
	product: WarehouseItem;
};

export const ProductDetails = ({ product }: Props) => (
	<View style={styles.container}>
		<ThemedText type="defaultSemiBold" style={styles.name}>
			{product.name}
		</ThemedText>

		<View style={styles.row}>
			<ThemedText type="defaultSemiBold" style={styles.price}>
				{formatCurrency(product.unitPrice)}
			</ThemedText>
			<ThemedText style={styles.quantity}>
				Available: {product.quantity}
			</ThemedText>
		</View>

		<ThemedText style={styles.sectionTitle}>Description</ThemedText>
		<ThemedText style={styles.description}>{product.description}</ThemedText>
	</View>
);

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	name: {
		fontSize: 24,
		marginBottom: 12,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
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
});
