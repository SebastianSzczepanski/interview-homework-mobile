import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export const ProductLoadingState = () => {
	const theme = useColorScheme() ?? "light";
	return (
		<View style={styles.centered}>
			<ActivityIndicator size="large" color={Colors[theme].text} />
		</View>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
