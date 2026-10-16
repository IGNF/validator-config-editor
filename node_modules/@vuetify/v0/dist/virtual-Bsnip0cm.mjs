import { n as createPagination, t as DataTableAdapter } from "./adapter-DMzQI6ma.mjs";
import { toRef, watch } from "vue";
//#region src/composables/createDataTable/adapters/virtual.ts
/**
* @module createDataTable/adapters/virtual
*
* @remarks
* Virtual scrolling data table adapter. Performs client-side filtering
* and sorting (via DataTableAdapter base) but skips pagination slicing,
* returning all sorted items for use with createVirtual at the component level.
*
* Pagination is created with itemsPerPage matching the total item count,
* effectively placing all items on a single page. The consumer wraps
* `table.items` (or `table.sortedItems`) with createVirtual to render
* only the visible viewport.
*/
var VirtualDataTableAdapter = class extends DataTableAdapter {
	setup(context) {
		const { search, sortBy, locale, customSorts } = context;
		const { allItems, filteredItems } = this.filter(context);
		const sortedItems = this.sort(filteredItems, sortBy, locale, customSorts);
		const size = toRef(() => sortedItems.value.length);
		const pagination = createPagination({
			size,
			itemsPerPage: size
		});
		watch([search, sortBy], () => {
			pagination.first();
		});
		return {
			allItems,
			filteredItems,
			sortedItems,
			items: sortedItems,
			pagination,
			total: toRef(() => sortedItems.value.length)
		};
	}
};
//#endregion
export { VirtualDataTableAdapter as t };
