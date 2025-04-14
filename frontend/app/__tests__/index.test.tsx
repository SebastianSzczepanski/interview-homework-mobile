import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { useGetWarehouseProducts } from "@/hooks/useGetWarehouseProduckts";
import Index from "..";
import { store } from "@/store";
import { Provider } from "react-redux";

jest.mock("expo-router", () => ({
	useRouter: jest.fn(),
}));

jest.mock("@/hooks/useGetWarehouseProduckts", () => ({
	useGetWarehouseProducts: jest.fn(),
}));

const mockRouter = { push: jest.fn() };
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("Index Screen", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the ProductListHeader and FlatList", () => {
		(useGetWarehouseProducts as jest.Mock).mockReturnValue({
			products: [],
			fetchNextPage: jest.fn(),
			isLoading: false,
		});

		render(
			<Provider store={store}>
				<Index />
			</Provider>,
		);

		expect(screen.getByTestId("product-list-header")).toBeTruthy();
		expect(screen.getByTestId("product-list")).toBeTruthy();
	});

	it("shows loading state when isLoading is true", () => {
		(useGetWarehouseProducts as jest.Mock).mockReturnValue({
			products: [],
			fetchNextPage: jest.fn(),
			isLoading: true,
		});

		render(
			<Provider store={store}>
				<Index />
			</Provider>,
		);

		expect(screen.getByTestId("loading-state")).toBeTruthy();
	});

	it("renders the correct number of products", () => {
		const mockProducts = [
			{
				id: "1",
				name: "Product 1",
				description: "Description 1",
				quantity: 1,
				unitPrice: 10,
			},
			{
				id: "2",
				name: "Product 2",
				description: "Description 2",
				quantity: 2,
				unitPrice: 20,
			},
		];
		(useGetWarehouseProducts as jest.Mock).mockReturnValue({
			products: mockProducts,
			fetchNextPage: jest.fn(),
			isLoading: false,
		});

		render(
			<Provider store={store}>
				<Index />
			</Provider>,
		);

		expect(screen.getByTestId("product-listing-1")).toBeTruthy();
		expect(screen.getByTestId("product-listing-2")).toBeTruthy();
	});

	it("navigates to product details on product press", () => {
		const mockProducts = [
			{
				id: "1",
				name: "Product 1",
				description: "Description 1",
				quantity: 1,
				unitPrice: 10,
			},
		];
		(useGetWarehouseProducts as jest.Mock).mockReturnValue({
			products: mockProducts,
			fetchNextPage: jest.fn(),
			isLoading: false,
		});

		render(
			<Provider store={store}>
				<Index />
			</Provider>,
		);
		fireEvent.press(screen.getByTestId("product-listing-1"));

		expect(mockRouter.push).toHaveBeenCalledWith({
			pathname: "/product",
			params: { id: "1" },
		});
	});

	it("calls fetchNextPage on reaching the end of the list", () => {
		const mockFetchNextPage = jest.fn();
		(useGetWarehouseProducts as jest.Mock).mockReturnValue({
			products: Array.from({ length: 30 }, (_, i) => ({
				id: i,
				name: "Product 1",
				description: "Description 1",
				quantity: 1,
				unitPrice: 10,
			})),
			fetchNextPage: mockFetchNextPage,
			isLoading: false,
		});

		render(
			<Provider store={store}>
				<Index />
			</Provider>,
		);
		const list = screen.getByTestId("product-list");

		fireEvent(list, "onEndReached");

		expect(mockFetchNextPage).toHaveBeenCalled();
	});
});
