import React from "react";
import {
	StyleSheet,
	FlatList,
	SafeAreaView,
	ListRenderItem,
	Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { selectProductsToShip } from "@/store/shipment/selectors";
import { CartListItem } from "@/components/shiping/CartListItem";
import { ShipmentItem } from "@/models/ShipmentItem";
import { ScreenHeader } from "@/components/ScreenHeader";
import { CartEmptyState } from "@/components/shiping/CartEmptyState";
import { CartListHeader } from "@/components/shiping/CartListHeader";
import { CartSummary } from "@/components/shiping/CartSummary";

const keyExtractor = (item: ShipmentItem) => item.product.id;

export default function Cart() {
	const router = useRouter();
	const productsInCart = useSelector(selectProductsToShip);

	const renderItem: ListRenderItem<ShipmentItem> = ({ item }) => (
		<CartListItem {...item} />
	);

	const handleGoToCheckout = () => {
		Alert.alert(
			"This is a placeholder",
			"Checkout functionality is not implemented yet.",
		);
	};

	return (
		<>
			<ScreenHeader title="Your cart" />
			<SafeAreaView style={styles.container}>
				<FlatList<ShipmentItem>
					data={productsInCart}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					contentContainerStyle={styles.listContent}
					ListEmptyComponent={
						<CartEmptyState onContinueShopping={router.back} />
					}
					ListHeaderComponent={<CartListHeader />}
				/>

				<CartSummary onCheckout={handleGoToCheckout} />
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	listContent: {
		paddingBottom: 16,
	},
});
