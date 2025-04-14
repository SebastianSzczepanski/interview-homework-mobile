import { WarehouseItem } from "./WarehouseItem";

export interface ShipmentItem {
    product: WarehouseItem;
    quantity: number;
}