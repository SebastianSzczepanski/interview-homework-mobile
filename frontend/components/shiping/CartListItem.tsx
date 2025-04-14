import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";

import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { formatCurrency } from "@/utils/formatCurrency";

import { AppDispatch } from "@/store";
import { ShipmentItem } from "@/models/ShipmentItem";
import {
	updateProductQuantity,
	deleteProductToShip,
} from "@/store/shipment/slice";

type CartListItemProps = ShipmentItem;

export const CartListItem = ({ product, quantity }: CartListItemProps) => {
	const theme = useColorScheme() ?? "light";
	const dispatch = useDispatch<AppDispatch>();

	const handleQuantityChange = (change: number) => {
		const newQuantity = Math.max(1, quantity + change);
		dispatch(updateProductQuantity({ id: product.id, quantity: newQuantity }));
	};

	const handleRemove = () => {
		dispatch(deleteProductToShip(product.id));
	};

	return (
		<View style={styles.container}>
			<View style={styles.info}>
				<ThemedText type="defaultSemiBold">{product.name}</ThemedText>
				<ThemedText type="description" style={styles.description}>
					{product.description.length > 60
						? `${product.description.slice(0, 60)}...`
						: product.description}
				</ThemedText>
				<ThemedText type="defaultSemiBold" style={styles.price}>
					{formatCurrency(product.unitPrice * quantity)}
				</ThemedText>
			</View>

			<View style={styles.controls}>
				<Pressable style={styles.button} onPress={() => handleQuantityChange(-1)}>
					<IconSymbol name="minus" size={16} color={Colors[theme].text} />
				</Pressable>

				<ThemedText style={styles.quantity}>{quantity}</ThemedText>

				<Pressable style={styles.button} onPress={() => handleQuantityChange(1)}>
					<IconSymbol name="plus" size={16} color={Colors[theme].text} />
				</Pressable>
			</View>

			<Pressable style={styles.remove} onPress={handleRemove}>
				<IconSymbol name="delete" size={20} color="#FF3B30" />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	info: {
		flex: 2,
		marginRight: 10,
	},
	description: {
		fontSize: 12,
		color: "#555",
		marginTop: 4,
	},
	price: {
		fontSize: 12,
		color: "#777",
		marginTop: 4,
	},
	controls: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		width: 28,
		height: 28,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
		borderRadius: 14,
	},
	quantity: {
		paddingHorizontal: 12,
		fontSize: 16,
	},
	remove: {
		padding: 4,
	},
});
