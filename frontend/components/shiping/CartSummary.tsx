import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { formatCurrency } from "@/utils/formatCurrency";
import { useSelector } from "react-redux";
import {
	selectProductsToShipCount,
	selectTotalPriceToShip,
} from "@/store/shipment/selectors";
import Button from "../ui/Button";

type CartSummaryProps = {
	onCheckout: () => void;
};

export const CartSummary = ({ onCheckout }: CartSummaryProps) => {
	const totalItems = useSelector(selectProductsToShipCount);
	const totalPrice = useSelector(selectTotalPriceToShip);

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

			<Button
				style={styles.button}
				onPress={onCheckout}
				title="Checkout"
			></Button>
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
		marginTop: 16,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});
