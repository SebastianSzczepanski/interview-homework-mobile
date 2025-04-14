import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

type CartEmptyStateProps = {
	onContinueShopping: () => void;
};

export const CartEmptyState = ({ onContinueShopping }: CartEmptyStateProps) => {
	const theme = useColorScheme() ?? "light";

	return (
		<View style={styles.container}>
			<IconSymbol
				name="shoppingcart"
				size={64}
				color={Colors[theme].text}
				style={styles.icon}
			/>
			<ThemedText type="defaultSemiBold" style={styles.text}>
				Your cart is empty
			</ThemedText>
			<Pressable style={styles.button} onPress={onContinueShopping}>
				<ThemedText style={styles.buttonText}>Continue Shopping</ThemedText>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	icon: {
		marginBottom: 16,
		opacity: 0.5,
	},
	text: {
		fontSize: 18,
		marginBottom: 20,
	},
	button: {
		backgroundColor: "#0A0A32",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});
