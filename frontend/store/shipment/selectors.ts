import { RootState } from "..";
import { createSelector } from "@reduxjs/toolkit";
import { selectById } from "../warehouse/selectors";

export const selectShipment = (state: RootState) => state.shipment;

export const selectProductsToShip = createSelector(
	[selectShipment, (state: RootState) => state],
	(shipment, state) => {
		return shipment.productsToShip
			.map((product) => ({
				product: selectById(state, product.id),
				quantity: product.quantity,
			}))
			.filter(Boolean);
	},
);

export const selectTotalPriceToShip = createSelector(
	[selectProductsToShip],
	(productsToShip) => {
		return productsToShip.reduce((total, { product, quantity }) => {
			if (!product) return total;
			return total + product.unitPrice * quantity;
		}, 0);
	},
);

export const selectProductsToShipCount = createSelector(
	[selectShipment],
	(shipment) =>
		shipment.productsToShip.reduce(
			(total, product) => total + product.quantity,
			0,
		),
);

export const selectProductFromShipment = (productId: string) =>
	createSelector(
		[selectShipment],
		(shipment) =>
			shipment?.productsToShip?.find((p) => p.id === productId) ?? false,
	);

export const selectProductQuantityInShipment = (productId: string) =>
	createSelector(
		[selectShipment],
		(shipment) =>
			shipment?.productsToShip?.find((p) => p.id === productId)
				?.quantity ?? 0,
	);
