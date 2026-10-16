import { n as DataTableAdapterContext, r as DataTableAdapterResult, t as DataTableAdapter } from "./adapter-BP7jNtvH.mjs";
import { MaybeRefOrGetter } from "vue";
//#region src/composables/createDataTable/adapters/server.d.ts
interface ServerDataTableAdapterOptions {
  /** Total number of items on the server (for pagination calculation) */
  total: MaybeRefOrGetter<number>;
  /** Loading state (e.g., from useFetch) */
  loading?: MaybeRefOrGetter<boolean>;
  /** Error state from API */
  error?: MaybeRefOrGetter<Error | null>;
}
declare class ServerDataTableAdapter<T extends object> extends DataTableAdapter<T> {
  private options;
  constructor(options: ServerDataTableAdapterOptions);
  setup(context: DataTableAdapterContext<T>): DataTableAdapterResult<T>;
}
//#endregion
export { ServerDataTableAdapterOptions as n, ServerDataTableAdapter as t };