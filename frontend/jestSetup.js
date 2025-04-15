jest.mock("expo-font");

jest.mock("expo-router", () => ({
	useRouter: jest.fn(),
	useLocalSearchParams: jest.fn(() => ({ id: "1" })),
	Stack: {
		Screen: ({ children }) => <>{children}</>,
	},
}));

jest.mock("./store/api/apiSlice", () => {
	const originalModule = jest.requireActual("./store/api/apiSlice");
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
		useCreateProductMutation: jest.fn(() => {
			return [mockMutation, { isLoading: false }];
		}),
	};
});
