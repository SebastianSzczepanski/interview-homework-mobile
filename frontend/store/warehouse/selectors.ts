import { RootState } from "..";
import { warehouseAdapter } from "./slice";

export const { selectAll: selectAllWarehouseItems } =
	warehouseAdapter.getSelectors(
		(state: { warehouse: RootState["warehouse"] }) => state.warehouse,
	);
