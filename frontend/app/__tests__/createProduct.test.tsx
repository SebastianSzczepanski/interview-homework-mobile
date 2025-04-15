import React from "react";
import {
	render,
	screen,
	fireEvent,
	waitFor,
} from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "@/store";
import CreateProduct from "../createProduct";
import { useCreateProductMutation } from "@/store/api/apiSlice";
import { Alert } from "react-native";

describe("CreateProduct Screen", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the form correctly", () => {
		render(
			<Provider store={store}>
				<CreateProduct />
			</Provider>,
		);

		expect(screen.getByPlaceholderText("Product Name")).toBeTruthy();
		expect(screen.getByPlaceholderText("Description")).toBeTruthy();
		expect(screen.getByPlaceholderText("Quantity")).toBeTruthy();
		expect(screen.getByPlaceholderText("Price")).toBeTruthy();
		expect(screen.getByPlaceholderText("Image url")).toBeTruthy();
		expect(screen.getByText("Create Product")).toBeTruthy();
	});

	it("calls createProduct mutation on form submission", async () => {
		const mockCreateProduct = jest.fn(() => ({
			unwrap: jest.fn().mockResolvedValue({}),
		}));
		(useCreateProductMutation as jest.Mock).mockReturnValue([
			mockCreateProduct,
			{ isLoading: false },
		]);

		render(
			<Provider store={store}>
				<CreateProduct />
			</Provider>,
		);

		fireEvent.changeText(
			screen.getByPlaceholderText("Product Name"),
			"Test Product",
		);
		fireEvent.changeText(
			screen.getByPlaceholderText("Description"),
			"Test Description",
		);
		fireEvent.changeText(screen.getByPlaceholderText("Quantity"), "10");
		fireEvent.changeText(screen.getByPlaceholderText("Price"), "100");
		fireEvent.changeText(
			screen.getByPlaceholderText("Image url"),
			"http://example.com/image.jpg",
		);

		fireEvent.press(screen.getByText("Create Product"));

		await waitFor(() => {
			expect(mockCreateProduct).toHaveBeenCalledWith({
				name: "Test Product",
				description: "Test Description",
				quantity: 10,
				unitPrice: 100,
				imageUrl: "http://example.com/image.jpg",
			});
		});
	});

	it("shows success alert on successful product creation", async () => {
		const mockCreateProduct = jest.fn(() => ({
			unwrap: jest.fn().mockResolvedValue({}),
		}));
		(useCreateProductMutation as jest.Mock).mockReturnValue([
			mockCreateProduct,
			{ isLoading: false },
		]);

		const alertSpy = jest.spyOn(Alert, "alert");

		render(
			<Provider store={store}>
				<CreateProduct />
			</Provider>,
		);

		fireEvent.changeText(
			screen.getByPlaceholderText("Product Name"),
			"Test Product",
		);
		fireEvent.changeText(
			screen.getByPlaceholderText("Description"),
			"Test Description",
		);
		fireEvent.changeText(screen.getByPlaceholderText("Quantity"), "10");
		fireEvent.changeText(screen.getByPlaceholderText("Price"), "100");
		fireEvent.changeText(
			screen.getByPlaceholderText("Image url"),
			"http://example.com/image.jpg",
		);

		fireEvent.press(screen.getByText("Create Product"));

		await waitFor(() => {
			expect(alertSpy).toHaveBeenCalledWith(
				"Success",
				"Product created successfully",
			);
		});
	});

	it("shows error alert on failed product creation", async () => {
		const mockCreateProduct = jest.fn(() => ({
			unwrap: jest.fn().mockRejectedValue(new Error("Update failed")),
		}));
		(useCreateProductMutation as jest.Mock).mockReturnValue([
			mockCreateProduct,
			{ isLoading: false },
		]);

		const alertSpy = jest.spyOn(Alert, "alert");

		render(
			<Provider store={store}>
				<CreateProduct />
			</Provider>,
		);

		fireEvent.changeText(
			screen.getByPlaceholderText("Product Name"),
			"Test Product",
		);
		fireEvent.changeText(
			screen.getByPlaceholderText("Description"),
			"Test Description",
		);
		fireEvent.changeText(screen.getByPlaceholderText("Quantity"), "10");
		fireEvent.changeText(screen.getByPlaceholderText("Price"), "100");
		fireEvent.changeText(
			screen.getByPlaceholderText("Image url"),
			"http://example.com/image.jpg",
		);

		fireEvent.press(screen.getByText("Create Product"));

		await waitFor(() => {
			expect(alertSpy).toHaveBeenCalledWith(
				"Error",
				"Failed to create product",
			);
		});
	});
});
