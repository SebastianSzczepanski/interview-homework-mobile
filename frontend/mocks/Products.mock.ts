import { Page } from "@/models/Page";
import { WarehouseItem } from "@/models/WarehouseItem";

import { faker } from "@faker-js/faker";

const generateWarehouseItem = (id: number): WarehouseItem => ({
	id,
	imageUrl: faker.image.urlLoremFlickr(),
	name: faker.commerce.productName(),
	description: faker.lorem.sentence(),
	quantity: faker.number.int({ min: 0, max: 1000 }),
	unitPrice: Number(faker.commerce.price({ min: 1, max: 1000 })),
});

export const generateWarehouseItemsPage = (
	page: number,
	pageSize: number,
): Page<WarehouseItem> => {
	const totalItems = 1000;
	const items: WarehouseItem[] = [];
	const startIndex = (page - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalItems);

	for (let i = startIndex; i < endIndex; i++) {
		items.push(generateWarehouseItem(i + 1));
	}

	return {
		data: items,
		page,
		total: totalItems,
	};
};
