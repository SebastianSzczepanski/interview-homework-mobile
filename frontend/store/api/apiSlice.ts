import { Config } from "@/constants/Config";
import {
	generateWarehouseItem,
	generateWarehouseItemsPage,
} from "@/mocks/Products.mock";
import { PageRequest } from "@/models/Page";
import { WarehouseGetProductResponse } from "@/models/WarehouseGetProduct";
import { WarehouseItem } from "@/models/WarehouseItem";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "warehouseApi",
	baseQuery: fetchBaseQuery({
		baseUrl: Config.API_URL,
	}),
	tagTypes: ["Product"],
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
		getWarehouseProductById: builder.query<WarehouseItem, { id: string }>({
			queryFn: async ({ id }) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const result = generateWarehouseItem(id);
				return { data: result };
			},
			providesTags: (_, __, arg) => [{ type: "Product", id: arg.id }],
		}),
		updateProduct: builder.mutation<WarehouseItem, WarehouseItem>({
			queryFn: async (data) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				return { data: data };
			},
			invalidatesTags: (_, __, arg) => [{ type: "Product", id: arg.id }],
		}),
		deleteProduct: builder.mutation<void, { id: string }>({
			queryFn: async ({ id }) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				return { data: undefined };
			},
			invalidatesTags: (_, __, arg) => [{ type: "Product", id: arg.id }],
		}),
	}),
});

export const {
	useGetWarehouseProductsQuery,
	useGetWarehouseProductByIdQuery,
	useDeleteProductMutation,
	useUpdateProductMutation,
} = api;
