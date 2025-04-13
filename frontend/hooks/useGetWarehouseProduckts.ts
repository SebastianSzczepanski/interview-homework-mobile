import { Config } from "@/constants/Config";
import { useGetWarehouseProductsQuery } from "@/store/api/apiSlice";
import { selectAllWarehouseItems } from "@/store/warehouse/selectors";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useGetWarehouseProducts = () => {
	const [currentPage, setPage] = useState(1);
	const products = useSelector(selectAllWarehouseItems);
	const { data, isLoading, isError, isFetching } =
		useGetWarehouseProductsQuery({
			page: currentPage,
			pageSize: Config.PRODUCT_LIST_BATCH_SIZE,
		});

	const fetchNextPage = () => {
		if (data?.hasNextPage) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	return {
		products: products || [],
		isError,
		isLoading: isLoading || isFetching,
		fetchNextPage,
	};
};
