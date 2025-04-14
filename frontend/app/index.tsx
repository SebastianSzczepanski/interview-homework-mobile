import { useCallback } from "react";
import {
	ActivityIndicator,
	FlatList,
	ListRenderItem,
	SafeAreaView,
	StyleSheet,
} from "react-native";

import { WarehouseItem } from "@/models/WarehouseItem";
import { ProductListing } from "@/components/productsList/ProductListing";
import { Config } from "@/constants/Config";
import { useGetWarehouseProducts } from "@/hooks/useGetWarehouseProduckts";
import { useRouter } from "expo-router";
import { ProductListHeader } from "@/components/productsList/ProductListHeader";
import { CloudTalkBanner } from "@/components/CloudTalkBanner";

const keyExtractor = (item: WarehouseItem) => {
	return item.id;
};

export default function Index() {
	const router = useRouter();

	const { products, fetchNextPage, isLoading } = useGetWarehouseProducts();

	const handleProductPress = useCallback(
		({ id }: WarehouseItem) => {
			return router.push({ pathname: "/product", params: { id } });
		},
		[router],
	);

	const renderItem: ListRenderItem<WarehouseItem> = useCallback(
		({ item }) => (
			<ProductListing item={item} onPress={handleProductPress} />
		),
		[handleProductPress],
	);

	return (
		<SafeAreaView style={styles.container}>
			<CloudTalkBanner />
			<ProductListHeader />
			<FlatList<WarehouseItem>
				testID="product-list"
				data={products}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				initialNumToRender={Config.PRODUCT_LIST_BATCH_SIZE}
				maxToRenderPerBatch={Config.PRODUCT_LIST_BATCH_SIZE}
				onEndReachedThreshold={0.9}
				onEndReached={fetchNextPage}
				ListFooterComponent={isLoading ? <ActivityIndicator testID="loading-state" /> : null}
				ListFooterComponentStyle={styles.footer}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	footer: {
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		height: 50,
	},
});
