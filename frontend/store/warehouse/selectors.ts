import { RootState } from "..";
import { warehouseAdapter } from "./slice";

export const { selectAll: selectAllWarehouseItems, selectById } =
	warehouseAdapter.getSelectors(
		(state: { warehouse: RootState["warehouse"] }) => state.warehouse,
	);
