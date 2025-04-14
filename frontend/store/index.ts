import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { api } from "./api/apiSlice";
import warehouseReducer from './warehouse/slice';
import shipmentReducer from "./shipment/slice";

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	warehouse: warehouseReducer,
	shipment: shipmentReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
