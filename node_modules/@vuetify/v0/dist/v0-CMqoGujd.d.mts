import { n as DataTableAdapterContext, r as DataTableAdapterResult, t as DataTableAdapter } from "./adapter-BP7jNtvH.mjs";
//#region src/composables/createDataTable/adapters/v0.d.ts
declare class ClientDataTableAdapter<T extends object> extends DataTableAdapter<T> {
  setup(context: DataTableAdapterContext<T>): DataTableAdapterResult<T>;
}
//#endregion
export { ClientDataTableAdapter as t };