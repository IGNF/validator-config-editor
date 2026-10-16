import { n as createPagination, t as DataTableAdapter } from "./adapter-DMzQI6ma.mjs";
import { computed, toRef, watch } from "vue";
//#region src/composables/createDataTable/adapters/v0.ts
/**
* @module createDataTable/adapters/v0
*
* @remarks
* Default data table adapter that performs all pipeline operations client-side:
* filtering via createFilter, sorting via computed comparisons, and pagination
* via createPagination. Automatically resets to page 1 on filter/sort changes.
*/
var ClientDataTableAdapter = class extends DataTableAdapter {
	setup(context) {
		const { search, sortBy, locale, paginationOptions, customSorts } = context;
		const { allItems, filteredItems } = this.filter(context);
		const sortedItems = this.sort(filteredItems, sortBy, locale, customSorts);
		const pagination = createPagination({
			...paginationOptions,
			size: toRef(() => sortedItems.value.length)
		});
		const items = computed(() => {
			return sortedItems.value.slice(pagination.pageStart.value, pagination.pageStop.value);
		});
		watch([search, sortBy], () => {
			pagination.first();
		});
		return {
			allItems,
			filteredItems,
			sortedItems,
			items,
			pagination,
			total: toRef(() => sortedItems.value.length)
		};
	}
};
//#endregion
export { ClientDataTableAdapter as t };
