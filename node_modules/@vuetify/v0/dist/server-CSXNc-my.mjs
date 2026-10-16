import { n as createPagination, t as DataTableAdapter } from "./adapter-DMzQI6ma.mjs";
import { toRef, toValue, watch } from "vue";
//#region src/composables/createDataTable/adapters/server.ts
/**
* @module createDataTable/adapters/server
*
* @remarks
* Server-side data table adapter. Assumes all filtering, sorting, and
* slicing is performed externally (e.g., by an API). The adapter provides
* pagination controls driven by a server-provided total item count.
*
* The consumer is responsible for watching `search`, `sortBy`, and
* `pagination.page` to trigger API calls and update the `items` ref.
*/
var ServerDataTableAdapter = class extends DataTableAdapter {
	options;
	constructor(options) {
		super();
		this.options = options;
	}
	setup(context) {
		const { items: _items, search, sortBy, paginationOptions } = context;
		const allItems = toRef(() => toValue(_items));
		const pagination = createPagination({
			...paginationOptions,
			size: toRef(() => toValue(this.options.total))
		});
		watch([search, sortBy], () => {
			pagination.first();
		});
		return {
			allItems,
			filteredItems: allItems,
			sortedItems: allItems,
			items: allItems,
			pagination,
			total: toRef(() => toValue(this.options.total)),
			loading: toRef(() => toValue(this.options.loading) ?? false),
			error: toRef(() => toValue(this.options.error) ?? null)
		};
	}
};
//#endregion
export { ServerDataTableAdapter as t };
