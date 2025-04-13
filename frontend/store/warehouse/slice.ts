import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { WarehouseItem } from "@/models/WarehouseItem";
import { api } from "../api/apiSlice";

export const warehouseAdapter = createEntityAdapter<WarehouseItem>();

const initialState = warehouseAdapter.getInitialState();

const warehouseSlice = createSlice({
	name: "warehouse",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.getWarehouseProducts.matchFulfilled,
			(state, { payload }) => {
				if (payload && payload.data && payload.data) {
					warehouseAdapter.upsertMany(state, payload.data);
				}
			},
		);
	},
});

export default warehouseSlice.reducer;
