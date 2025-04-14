import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { formatCurrency } from "@/utils/formatCurrency";

type CartSummaryProps = {
	totalItems: number;
	totalPrice: number;
	onCheckout?: () => void;
};

export const CartSummary = ({ totalItems, totalPrice, onCheckout }: CartSummaryProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<ThemedText style={styles.label}>Total Items:</ThemedText>
				<ThemedText style={styles.value}>{totalItems}</ThemedText>
			</View>

			<View style={styles.row}>
				<ThemedText style={styles.label}>Total Price:</ThemedText>
				<ThemedText type="defaultSemiBold" style={styles.total}>
					{formatCurrency(totalPrice)}
				</ThemedText>
			</View>

			<Pressable style={styles.button} onPress={onCheckout}>
				<ThemedText style={styles.buttonText}>Checkout</ThemedText>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderTopWidth: 1,
		borderTopColor: "#ddd",
		padding: 16,
		backgroundColor: "#f9f9f9",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	label: {
		fontSize: 16,
	},
	value: {
		fontSize: 16,
	},
	total: {
		fontSize: 20,
		color: "#0A0A32",
	},
	button: {
		backgroundColor: "#0A0A32",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 16,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});
