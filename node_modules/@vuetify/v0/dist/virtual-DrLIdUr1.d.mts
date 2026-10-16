import { n as DataTableAdapterContext, r as DataTableAdapterResult, t as DataTableAdapter } from "./adapter-BP7jNtvH.mjs";
//#region src/composables/createDataTable/adapters/virtual.d.ts
declare class VirtualDataTableAdapter<T extends object> extends DataTableAdapter<T> {
  setup(context: DataTableAdapterContext<T>): DataTableAdapterResult<T>;
}
//#endregion
export { VirtualDataTableAdapter as t };