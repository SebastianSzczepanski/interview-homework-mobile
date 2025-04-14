import React from "react";
import { View, Image, StyleSheet } from "react-native";

type Props = {
	uri?: string;
};

export const ProductImage = ({ uri }: Props) => (
	<View style={styles.container}>
		<Image source={{ uri }} style={styles.image} resizeMode="center" />
	</View>
);

const styles = StyleSheet.create({
	container: {
		height: 300,
		width: "100%",
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
