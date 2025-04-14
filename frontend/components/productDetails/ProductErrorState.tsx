import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

type Props = {
	onBack: () => void;
};

export const ProductErrorState = ({ onBack }: Props) => (
	<View style={styles.container}>
		<ThemedText type="defaultSemiBold">Product not found</ThemedText>
		<Pressable onPress={onBack} style={styles.back}>
			<ThemedText>Go Back</ThemedText>
		</Pressable>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	back: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#f0f0f0",
		borderRadius: 5,
	},
});
