import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export const CartListHeader = () => (
	<View style={styles.container}>
		<ThemedText type="defaultSemiBold" style={styles.text}>
			Product
		</ThemedText>
		<ThemedText type="defaultSemiBold" style={styles.text}>
			Quantity
		</ThemedText>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "#f5f5f5",
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	text: {
		fontSize: 14,
	},
});
