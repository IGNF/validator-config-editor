import { a as ID, i as Extensible } from "./index-XNZrgWCq.mjs";
import { t as ContextTrinity } from "./index-ClUa0Bl7.mjs";
import { c as RegistryTicketInput, s as RegistryTicket, t as RegistryContext } from "./index-Y6VfllT2.mjs";
import { a as SortEntry, c as PaginationOptions, i as SortDirection, o as PaginationContext, t as DataTableAdapter, v as FilterOptions } from "./adapter-BP7jNtvH.mjs";
import "./index-DmDf_FmM.mjs";
import { MaybeRefOrGetter, Ref, ShallowRef } from "vue";
//#region src/composables/createDataTable/columns.d.ts
/**
 * @module createDataTable/columns
 *
 * @remarks
 * Utilities for resolving recursive column definitions into flat leaf
 * columns and 2D header grids. Used by createDataTable for header
 * rendering.
 */
interface ColumnNode {
  readonly id: string;
  readonly title?: string;
  readonly children?: readonly ColumnNode[];
}
interface InternalHeader {
  id: string;
  title: string;
  colspan: number;
  rowspan: number;
  depth: number;
}
/**
 * Recursively extract leaf columns (those without children).
 *
 * @param columns Column tree to extract leaves from
 * @returns Flat array of leaf columns
 */
declare function extractLeaves<T extends ColumnNode>(columns: readonly T[]): T[];
/**
 * Compute the maximum nesting depth of a column tree (0 = flat).
 *
 * @param columns Column tree to measure
 * @returns Maximum nesting depth
 */
declare function computeDepth(columns: readonly ColumnNode[]): number;
/**
 * Resolve a recursive column tree into a 2D header grid.
 *
 * Each cell has colspan (number of leaf descendants) and rowspan
 * (how many rows a leaf spans when it doesn't fill all depth levels).
 *
 * @param columns Column tree to resolve
 * @returns 2D array of header cells with colspan/rowspan
 */
declare function resolveHeaders(columns: readonly ColumnNode[]): InternalHeader[][];
//#endregion
//#region src/composables/createDataTable/index.d.ts
type SelectStrategy = 'single' | 'page' | 'all';
/**
 * Input shape passed to `register` / `onboard` on a data table's row registry.
 *
 * @template T Row value type.
 *
 * @example
 * ```ts
 * const table = createDataTable<User>()
 * table.register({ id: user.id, value: user })
 * ```
 */
interface DataTableTicketInput<T extends object> extends RegistryTicketInput<T> {
  /** Row record. Required — the pipeline reads ticket.value. */
  value: T;
}
/**
 * Output ticket returned by row `register` / `onboard` / `get`.
 *
 * @template T Row value type.
 */
type DataTableTicket<T extends object> = RegistryTicket<T> & DataTableTicketInput<T>;
/**
 * Input shape passed to `table.columns.register` / `table.columns.onboard`.
 *
 * `id` is required and acts as the column identifier — selection, sort, and
 * filter all key off it. The `Extensible<keyof T & string>` shape preserves
 * autocomplete for the row's own keys while still accepting arbitrary strings
 * for derived columns (computed totals, action columns, etc.).
 *
 * @template T Row value type.
 *
 * @example
 * ```ts
 * import { createDataTable } from '@vuetify/v0'
 *
 * interface User { id: number, name: string, email: string }
 *
 * const table = createDataTable<User>()
 * table.columns.register({ id: 'name', title: 'Name', sortable: true })
 * table.columns.register({
 *   id: 'actions',
 *   title: '',
 *   sortable: false,
 * })
 * ```
 */
interface DataTableColumnTicketInput<T extends object = object> extends RegistryTicketInput {
  /** Column identifier. Required — selection / sort / filter all key off it. */
  id: Extensible<keyof T & string>;
  /** Display title rendered in the header cell. */
  title?: string;
  /** Allow this column to participate in the sort pipeline. */
  sortable?: MaybeRefOrGetter<boolean>;
  /** Allow this column to participate in the filter pipeline. */
  filterable?: MaybeRefOrGetter<boolean>;
  /** Custom per-column sort comparator. */
  sort?: (a: unknown, b: unknown) => number;
  /** Custom per-column filter predicate. */
  filter?: (value: unknown, query: string) => boolean;
  /** Header-group children (recursive). Children are NOT separately registered. */
  children?: readonly DataTableColumnTicketInput<T>[];
}
/**
 * Output ticket returned by `table.columns.register` / `table.columns.onboard`.
 *
 * Combines the standard registry ticket fields (`index`, `valueIsIndex`,
 * `unregister`) with the column-shape fields from {@link DataTableColumnTicketInput}.
 *
 * @template T Row value type.
 */
type DataTableColumnTicket<T extends object = object> = RegistryTicket<DataTableColumnTicketInput<T>['value']> & DataTableColumnTicketInput<T>;
interface DataTableSort {
  /** Toggle sort for a column: none → asc → desc → none */
  toggle: (id: string) => void;
  /** Current sort columns derived from group state */
  columns: Readonly<Ref<SortEntry[]>>;
  /** Order of sort columns (for multi-sort priority) */
  order: readonly string[];
  /** Get sort direction for a specific column id */
  direction: (id: string) => SortDirection;
  /** Get sort priority index (0-based), or -1 if not sorted */
  priority: (id: string) => number;
  /** Reset all sort state */
  reset: () => void;
}
interface DataTableSelection {
  /** Currently selected row IDs */
  selectedIds: ReadonlySet<ID>;
  /** Select a row by ID */
  select: (id: ID) => void;
  /** Unselect a row by ID */
  unselect: (id: ID) => void;
  /** Toggle a row's selection */
  toggle: (id: ID) => void;
  /** Whether a row is selected */
  isSelected: (id: ID) => boolean;
  /** Whether a row can be selected (based on itemSelectable) */
  isSelectable: (id: ID) => boolean;
  /** Select all items within strategy scope */
  selectAll: () => void;
  /** Unselect all items across all pages */
  unselectAll: () => void;
  /** Toggle all items within strategy scope */
  toggleAll: () => void;
  /** Whether all items within strategy scope are selected */
  isAllSelected: Readonly<Ref<boolean>>;
  /** Whether some but not all items within strategy scope are selected */
  isMixed: Readonly<Ref<boolean>>;
}
interface DataTableGroup<T extends object> {
  /** Stringified group identifier */
  key: string;
  /** Raw value of the groupBy column for this group */
  value: T[keyof T & string];
  /** Items belonging to this group */
  items: readonly T[];
}
interface DataTableGrouping<T extends object> {
  /** Grouped items derived from sortedItems */
  groups: Readonly<Ref<DataTableGroup<T>[]>>;
  /** Toggle a group's open/closed state */
  toggle: (groupKey: string) => void;
  /** Whether a group is open */
  isOpen: (groupKey: string) => boolean;
  /** Open a group */
  open: (groupKey: string) => void;
  /** Close a group */
  close: (groupKey: string) => void;
  /** Open all groups */
  openAll: () => void;
  /** Close all groups */
  closeAll: () => void;
}
interface DataTableExpansion {
  /** Currently expanded row IDs */
  expandedIds: ReadonlySet<ID>;
  /** Expand a row by ID */
  expand: (id: ID) => void;
  /** Collapse a row by ID */
  collapse: (id: ID) => void;
  /** Toggle a row's expanded state */
  toggle: (id: ID) => void;
  /** Whether a row is expanded */
  isExpanded: (id: ID) => boolean;
  /** Expand all visible (paginated) items. Requires expandMultiple=true. */
  expandAll: () => void;
  /** Collapse all expanded items across all pages (not page-scoped like expandAll) */
  collapseAll: () => void;
}
interface DataTableOptions<T extends object> {
  /** Filter options (keys derived from columns) */
  filter?: Omit<FilterOptions, 'keys'>;
  /** Pagination options (size derived from pipeline) */
  pagination?: Omit<PaginationOptions, 'size'>;
  /** Enable multi-column sort. @default false */
  sortMultiple?: boolean;
  /** Prevent clearing sort (asc → desc → asc cycle). @default false */
  mandate?: boolean;
  /** Direction for first sort click. @default 'asc' */
  firstSortOrder?: 'asc' | 'desc';
  /** Selection strategy: 'single' selects one row, 'page' operates on visible items, 'all' operates on all filtered items. @default 'page' */
  selectStrategy?: SelectStrategy;
  /** Property that controls per-row selectability */
  itemSelectable?: keyof T & string;
  /** Column id to group rows by */
  groupBy?: keyof T & string;
  /** Auto-open all groups on creation. @default false */
  openAll?: boolean;
  /** Allow multiple rows expanded simultaneously. @default true */
  expandMultiple?: boolean;
  /** Locale for sorting. When set, wins over useLocale; otherwise useLocale or the browser default. */
  locale?: string;
  /** Pipeline adapter. @default ClientDataTableAdapter */
  adapter?: DataTableAdapter<T>;
}
interface DataTableContext<T extends object> extends RegistryContext<DataTableTicketInput<T>, DataTableTicket<T>> {
  /** Final paginated items for rendering */
  items: Readonly<Ref<readonly T[]>>;
  /** Raw unprocessed items */
  allItems: Readonly<Ref<readonly T[]>>;
  /** Items after filtering */
  filteredItems: Readonly<Ref<readonly T[]>>;
  /** Items after filtering and sorting */
  sortedItems: Readonly<Ref<readonly T[]>>;
  /** Rank a source array by `sortedItems`. v-for this so rows register; missing ranks stay in source order. */
  rank: <U extends object>(source: readonly U[]) => U[];
  /**
   * Column registry. Use `columns.register({...})`, `columns.onboard([...])`,
   * `columns.unregister(id)`, and `columns.clear()` to manage columns. The
   * registry is reactive — `leaves` and `headers` recompute when it mutates.
   */
  columns: RegistryContext<DataTableColumnTicketInput<T>, DataTableColumnTicket<T>>;
  /** Leaf columns (no children) used by the data pipeline. Reactive. */
  leaves: Readonly<Ref<readonly DataTableColumnTicket<T>[]>>;
  /** 2D header grid with colspan/rowspan for rendering thead. Reactive. */
  headers: Readonly<Ref<InternalHeader[][]>>;
  /** Set the search query */
  search: (value: string) => void;
  /** Current search query (readonly) */
  query: Readonly<ShallowRef<string>>;
  /** Sort controls */
  sort: DataTableSort;
  /** Pagination controls */
  pagination: PaginationContext;
  /** Row selection controls */
  selection: DataTableSelection;
  /** Row expansion controls */
  expansion: DataTableExpansion;
  /** Row grouping controls. When groupBy is not set, `groups` returns an empty array. */
  grouping: DataTableGrouping<T>;
  /** Total row count for aria-rowcount */
  total: Readonly<Ref<number>>;
  /** Loading state (managed by adapter) */
  loading: Readonly<Ref<boolean>>;
  /** Error state (managed by adapter) */
  error: Readonly<Ref<Error | null>>;
}
interface DataTableContextOptions<T extends object> extends DataTableOptions<T> {
  namespace?: string;
}
/**
 * Creates a data table instance with sort controls, selection, and an
 * adapter-driven data pipeline.
 *
 * Rows and columns are both managed via internal registries. Use
 * `table.columns.register({ id, ... })` / `table.columns.onboard([...])` to
 * add columns and `table.register({ id, value })` / `table.onboard([...])`
 * for rows. Removing entries from the column registry reactively updates
 * `leaves`, `headers`, the sort group, and the filter pipeline.
 *
 * Must be called inside a component `setup()` or a Vue effect scope.
 * Calling at module scope in SSR environments causes request state leakage.
 *
 * @param options Data table options (all optional)
 * @returns Data table context with pipeline stages, controls, and registry surface
 *
 * @example
 * ```ts
 * import { createDataTable } from '@vuetify/v0'
 *
 * const table = createDataTable<User>()
 *
 * table.columns.onboard([
 *   { id: 'name', title: 'Name', sortable: true, filterable: true },
 *   { id: 'email', title: 'Email', sortable: true, filterable: true },
 *   { id: 'age', title: 'Age', sortable: true },
 * ])
 *
 * table.onboard(users.map(value => ({ id: value.id, value })))
 *
 * table.search('john')
 *
 * table.sort.toggle('name')
 * table.sort.toggle('name')
 * table.sort.toggle('name')
 *
 * table.pagination.next()
 *
 * table.selection.toggle(1)
 * ```
 */
declare function createDataTable<T extends object>(options?: DataTableOptions<T>): DataTableContext<T>;
/**
 * Creates a data table context with dependency injection support.
 *
 * The returned context exposes both row and column registries. Columns must
 * be onboarded after construction — pass them via `context.columns.onboard`,
 * not in the factory options.
 *
 * @param options Data table context options including namespace
 * @returns A trinity tuple: [useDataTable, provideDataTable, defaultContext]
 *
 * @example
 * ```ts
 * import { createDataTableContext } from '@vuetify/v0'
 *
 * const [useDataTable, provideDataTable, context] = createDataTableContext<User>({
 *   namespace: 'app:users',
 * })
 *
 * context.columns.onboard([
 *   { id: 'name', title: 'Name', sortable: true },
 * ])
 *
 * // Parent component
 * provideDataTable()
 * context.onboard(users.map(value => ({ id: value.id, value })))
 *
 * // Child component
 * const table = useDataTable()
 * ```
 */
declare function createDataTableContext<T extends object>(_options?: DataTableContextOptions<T>): ContextTrinity<DataTableContext<T>>;
/**
 * Returns the current data table context from dependency injection.
 *
 * @typeParam T - Must be provided explicitly; cannot be inferred from namespace.
 *   Prefer the `useX` function from {@link createDataTableContext} for type-safe injection.
 *
 * @param namespace The namespace for the data table context. @default 'v0:data-table'
 * @returns The current data table context
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useDataTable } from '@vuetify/v0'
 *
 *   const table = useDataTable<User>()
 * </script>
 * ```
 */
declare function useDataTable<T extends object>(namespace?: string): DataTableContext<T>;
//#endregion
export { ColumnNode as _, DataTableExpansion as a, extractLeaves as b, DataTableOptions as c, DataTableTicket as d, DataTableTicketInput as f, useDataTable as g, createDataTableContext as h, DataTableContextOptions as i, DataTableSelection as l, createDataTable as m, DataTableColumnTicketInput as n, DataTableGroup as o, SelectStrategy as p, DataTableContext as r, DataTableGrouping as s, DataTableColumnTicket as t, DataTableSort as u, InternalHeader as v, resolveHeaders as x, computeDepth as y };