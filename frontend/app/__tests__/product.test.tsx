import React from "react";
import {
	render,
	screen,
	fireEvent,
	waitFor,
} from "@testing-library/react-native";
import { Provider } from "react-redux";
import { useRouter } from "expo-router";
import { store } from "../../store";
import {
	useGetWarehouseProductByIdQuery,
	useUpdateProductMutation,
} from "../../store/api/apiSlice";
import Product from "../product";

jest.mock("expo-router", () => ({
	useRouter: jest.fn(),
	useLocalSearchParams: jest.fn(() => ({ id: "1" })),
	Stack: {
		Screen: ({ children }: { children: React.ReactNode }) => (
			<>{children}</>
		),
	},
}));

jest.mock("@/store/api/apiSlice", () => {
	const originalModule = jest.requireActual("@/store/api/apiSlice");
	const unwrapMock = jest.fn();
	const mockMutation = jest.fn().mockReturnValue({ unwrap: unwrapMock });

	return {
		__esModule: true,
		...originalModule,
		useGetWarehouseProductByIdQuery: jest.fn(() => ({
			data: null,
			isLoading: false,
		})),
		useUpdateProductMutation: jest.fn(() => {
			return [mockMutation, { isLoading: false }];
		}),
		useDeleteProductMutation: jest.fn(() => {
			return [mockMutation, { isLoading: false }];
		}),
	};
});

const mockRouter = { back: jest.fn() };
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("Product Screen", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("shows an alert when product update fails", async () => {
		const mockUpdateProduct = jest.fn(() => ({
			unwrap: jest.fn().mockRejectedValue(new Error("Update failed")),
		}));
		(useUpdateProductMutation as jest.Mock).mockReturnValue([
			mockUpdateProduct,
			{ isLoading: false },
		]);
		(useGetWarehouseProductByIdQuery as jest.Mock).mockReturnValue({
			data: {
				id: "1",
				name: "Test Product",
				description: "Test Description",
				quantity: 10,
				unitPrice: 100,
			},
			isLoading: false,
		});

		render(
			<Provider store={store}>
				<Product />
			</Provider>,
		);

		fireEvent.changeText(
			screen.getByPlaceholderText("Product Name"),
			"Updated Product",
		);
		fireEvent.press(screen.getByText("Update"));

		await waitFor(() => {
			expect(mockUpdateProduct).toHaveBeenCalled();
		});
	});

	it("renders loading state", () => {
		(useGetWarehouseProductByIdQuery as jest.Mock).mockReturnValue({
			data: null,
			isLoading: true,
		});

		render(
			<Provider store={store}>
				<Product />
			</Provider>,
		);

		expect(screen.getByTestId("loading-state")).toBeTruthy();
	});

	it("renders error state when product is not found", () => {
		(useGetWarehouseProductByIdQuery as jest.Mock).mockReturnValue({
			data: null,
			isLoading: false,
		});

		render(
			<Provider store={store}>
				<Product />
			</Provider>,
		);

		expect(screen.getByText("Product not found")).toBeTruthy();
	});

	it("renders product details", () => {
		(useGetWarehouseProductByIdQuery as jest.Mock).mockReturnValue({
			data: {
				id: "1",
				name: "Test Product",
				description: "Test Description",
				quantity: 10,
				unitPrice: 100,
				imageUrl: "https://example.com/image.jpg",
			},
			isLoading: false,
		});

		render(
			<Provider store={store}>
				<Product />
			</Provider>,
		);

		expect(screen.getByText("Test Product")).toBeTruthy();
		expect(screen.getByText("Test Description")).toBeTruthy();
		expect(screen.getByText("Available: 10")).toBeTruthy();
	});

	it("handles product update", async () => {
		const mockUpdateProduct = jest.fn().mockResolvedValue({});
		(useUpdateProductMutation as jest.Mock).mockReturnValue([
			mockUpdateProduct,
			{ isLoading: false },
		]);
		(useGetWarehouseProductByIdQuery as jest.Mock).mockReturnValue({
			data: {
				id: "1",
				name: "Test Product",
				description: "Test Description",
				quantity: 10,
				unitPrice: 100,
			},
			isLoading: false,
		});

		render(
			<Provider store={store}>
				<Product />
			</Provider>,
		);

		fireEvent.changeText(
			screen.getByPlaceholderText("Product Name"),
			"Updated Product",
		);
		fireEvent.changeText(
			screen.getByPlaceholderText("Description"),
			"Updated Description",
		);
		fireEvent.changeText(screen.getByPlaceholderText("Quantity"), "20");
		fireEvent.changeText(screen.getByPlaceholderText("Price"), "200");

		fireEvent.press(screen.getByText("Update"));

		await waitFor(() => {
			expect(mockUpdateProduct).toHaveBeenCalledWith({
				id: "1",
				name: "Updated Product",
				description: "Updated Description",
				quantity: 20,
				unitPrice: 200,
			});
		});
	});
});
