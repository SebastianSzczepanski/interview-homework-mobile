import { Config } from "@/constants/Config";
import { generateWarehouseItemsPage } from "@/mocks/Products.mock";
import { PageRequest } from "@/models/Page";
import { WarehouseGetProductResponse } from "@/models/WarehouseGetProduct";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "warehouseApi",
	baseQuery: fetchBaseQuery({
		baseUrl: Config.API_URL,
	}),
	endpoints: (builder) => ({
		getWarehouseProducts: builder.query<
			WarehouseGetProductResponse,
			PageRequest
		>({
			queryFn: async (queryParams: PageRequest) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const result = generateWarehouseItemsPage(
					queryParams.page,
					queryParams.pageSize || 20,
				);
				return { data: result };
			},
		}),
	}),
});

export const { useGetWarehouseProductsQuery } = api;
