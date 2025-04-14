import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WarehouseItem } from "@/models/WarehouseItem";

interface ShipmentProduct {
	id: WarehouseItem["id"];
	quantity: number;
}

interface ShipmentState {
	productsToShip: ShipmentProduct[];
}

const initialState: ShipmentState = {
	productsToShip: [],
};

const shipmentSlice = createSlice({
	name: "shipment",
	initialState,
	reducers: {
		addProductToShip: (state, action: PayloadAction<ShipmentProduct>) => {
			const product = state.productsToShip.find(
				(product) => product.id === action.payload.id,
			);

			if (product) {
				product.quantity = product.quantity + action.payload.quantity;
			} else {
				state.productsToShip.push(action.payload);
			}
		},

		updateProductQuantity: (
			state,
			action: PayloadAction<ShipmentProduct>,
		) => {
			const product = state.productsToShip.find(
				(product) => product.id === action.payload.id,
			);
			if (product) {
				product.quantity = action.payload.quantity;
			}
		},
		deleteProductToShip: (state, action) => {
			state.productsToShip = state.productsToShip.filter(
				(id) => id === action.payload,
			);
		},
	},
});

export const { addProductToShip, updateProductQuantity, deleteProductToShip } =
	shipmentSlice.actions;
export default shipmentSlice.reducer;
