import React from "react";
import {
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { selectProductsToShipCount } from "@/store/shipment/selectors";

export const ProductListHeader = () => {
	const router = useRouter();
	const theme = useColorScheme() ?? "light";
	const textColor =
		theme === "light" ? Colors.light.textInverse : Colors.dark.textInverse;

	const cartItemsCount = useSelector(selectProductsToShipCount);

	const handleCartPress = () => {
		router.push("/cart");
	};

	const handleAddProductPress = () => {
		// TODO: Add product logic
	};

	return (
		<View style={styles.header}>
			<View style={styles.actionsContainer}>
				<TouchableOpacity
					style={styles.cartIconContainer}
					onPress={handleCartPress}
				>
					<IconSymbol
						name="shoppingcart"
						size={24}
						weight="medium"
						color={textColor}
					/>
					{cartItemsCount > 0 && (
						<View style={styles.badgeContainer}>
							<ThemedText
								style={styles.badgeText}
								lightColor={Colors.light.text}
								darkColor={Colors.dark.text}
							>
								{cartItemsCount > 99 ? "99+" : cartItemsCount}
							</ThemedText>
						</View>
					)}
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.addButton}
					onPress={handleAddProductPress}
				>
					<IconSymbol
						name="plus"
						size={16}
						weight="medium"
						color={textColor}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#0A0A32",
		padding: 16,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	actionsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	cartIconContainer: {
		position: "relative",
		padding: 4,
	},
	badgeContainer: {
		position: "absolute",
		top: -4,
		right: -4,
		backgroundColor: "#FF5252",
		borderRadius: 10,
		minWidth: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 4,
	},
	badgeText: {
		fontSize: 12,
		fontWeight: "bold",
	},
	addButton: {
		flexDirection: "row",
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 6,
		alignItems: "center",
	},
});
