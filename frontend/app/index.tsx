import { useCallback } from "react";
import {
	FlatList,
	Linking,
	ListRenderItem,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { WarehouseItem } from "@/models/WarehouseItem";
import { ProductListing } from "@/components/ProductListing";
import { SocialIcons } from "@/constants/SocialIcons";
import { useGetWarehouseProductsQuery } from "@/store/api/apiSlice";

const keyExtractor = (item: WarehouseItem) => {
	return item.id.toString();
};

export default function Index() {
	const theme = useColorScheme() ?? "light";
	const { data } = useGetWarehouseProductsQuery({ page: 0, pageSize: 20 });

	const products = data?.data || [];

	const openURL = (url: string) => {
		Linking.openURL(url).catch((err) =>
			console.error("An error occurred", err),
		);
	};

	const renderItem: ListRenderItem<WarehouseItem> = useCallback(
		({ item }) => <ProductListing item={item} />,
		[],
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<ThemedText
					type="defaultSemiBold"
					style={styles.headerText}
					lightColor={Colors.light.textInverse}
					darkColor={Colors.dark.textInverse}
				>
					Welcome adventurer and Good luck, looking forward to meeting
					you!
				</ThemedText>
				<View style={styles.socialIcons}>
					{SocialIcons.map((icon) => (
						<TouchableOpacity
							key={icon.name}
							onPress={() => {
								openURL(icon.link);
							}}
						>
							<IconSymbol
								name={icon.name as IconSymbolName}
								size={18}
								weight="medium"
								color={
									theme === "light"
										? Colors.light.textInverse
										: Colors.dark.textInverse
								}
							/>
						</TouchableOpacity>
					))}
				</View>
			</View>

			<FlatList<WarehouseItem>
				data={products}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	header: {
		backgroundColor: "#0A0A32",
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 4,
		alignItems: "center",
	},
	headerText: {
		flex: 1,
	},
	socialIcons: {
		flexDirection: "row",
		gap: 10,
	},
});
