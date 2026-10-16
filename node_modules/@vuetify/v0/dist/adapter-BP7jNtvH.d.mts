import { t as ContextTrinity } from "./index-ClUa0Bl7.mjs";
import { ComputedRef, MaybeRefOrGetter, Ref, ShallowRef, WritableComputedRef } from "vue";
//#region src/composables/createFilter/index.d.ts
type Primitive = string | number | boolean;
type FilterQuery = MaybeRefOrGetter<Primitive | Primitive[]>;
type FilterItem = Primitive | Record<string, unknown>;
type FilterMode = 'some' | 'every' | 'union' | 'intersection';
type FilterFunction = (query: Primitive | Primitive[], item: FilterItem) => boolean;
interface FilterOptions {
  customFilter?: FilterFunction;
  keys?: MaybeRefOrGetter<readonly string[]>;
  mode?: FilterMode;
}
interface FilterResult<Z extends FilterItem = FilterItem> {
  items: ComputedRef<Z[]>;
}
interface FilterContext<Z extends FilterItem = FilterItem> {
  /** The filter mode */
  mode: FilterMode;
  /** Keys to filter on for object items */
  keys: MaybeRefOrGetter<readonly string[]> | undefined;
  /** Custom filter function */
  customFilter: FilterFunction | undefined;
  /** Current query ref */
  query: ShallowRef<Primitive | Primitive[]>;
  /**
   * Apply filter to an array of items
   *
   * @param query The query to filter by
   * @param items The items to filter
   * @returns The filtered items as a computed ref
   */
  apply: <T extends Z>(query: FilterQuery, items: MaybeRefOrGetter<T[]>) => FilterResult<T>;
}
interface FilterContextOptions extends FilterOptions {
  namespace?: string;
}
/**
 * Creates a filter context with pre-configured options.
 *
 * @param options The filter options
 * @template Z The type of the items
 * @template E The type of the filter context
 * @returns A filter context
 *
 * @see https://0.vuetifyjs.com/composables/data/create-filter
 *
 * @example
 * ```ts
 * import { createFilter } from '@vuetify/v0'
 *
 * const filter = createFilter({
 *   mode: 'intersection',
 *   keys: ['name', 'email'],
 * })
 *
 * const { items } = filter.apply(query, users)
 * ```
 */
declare function createFilter<Z extends FilterItem = FilterItem, E extends FilterContext<Z> = FilterContext<Z>>(options?: FilterOptions): E;
/**
 * Creates a filter context with dependency injection support.
 *
 * @param options The filter context options
 * @template Z The type of the items
 * @template E The type of the filter context
 * @returns A trinity tuple: [useContext, provideContext, defaultContext]
 *
 * @see https://0.vuetifyjs.com/composables/data/create-filter
 *
 * @example
 * ```ts
 * import { createFilterContext } from '@vuetify/v0'
 *
 * export const [useSearchFilter, provideSearchFilter, searchFilter] = createFilterContext({
 *   namespace: 'app:search',
 *   mode: 'union',
 *   keys: ['title', 'description'],
 * })
 *
 * // In parent component
 * provideSearchFilter()
 *
 * // In child component
 * const filter = useSearchFilter()
 * const { items } = filter.apply(query, products)
 * ```
 */
declare function createFilterContext<Z extends FilterItem = FilterItem, E extends FilterContext<Z> = FilterContext<Z>>(_options?: FilterContextOptions): ContextTrinity<E>;
/**
 * Returns the current filter context from dependency injection.
 *
 * @param namespace The namespace for the filter context. Defaults to `'v0:filter'`.
 * @template Z The type of the items.
 * @template E The type of the filter context.
 * @returns The current filter context.
 *
 * @see https://0.vuetifyjs.com/composables/data/create-filter
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useFilter } from '@vuetify/v0'
 *
 *   const filter = useFilter()
 *   const { items } = filter.apply(query, products)
 * </script>
 * ```
 */
declare function useFilter<Z extends FilterItem = FilterItem, E extends FilterContext<Z> = FilterContext<Z>>(namespace?: string): E;
//#endregion
//#region src/composables/createPagination/index.d.ts
type PaginationTicket = {
  type: 'page';
  value: number;
} | {
  type: 'ellipsis';
  value: string;
};
interface PaginationContext {
  /** Current page (1-indexed, auto-clamped to total pages) */
  page: WritableComputedRef<number>;
  /** Items per page */
  itemsPerPage: number;
  /** Total number of items */
  size: number;
  /** Total number of pages (computed from size / itemsPerPage) */
  pages: number;
  /** Ellipsis character, or false if disabled */
  ellipsis: string | false;
  /** Visible page numbers and ellipsis for rendering */
  items: ComputedRef<PaginationTicket[]>;
  /** Start index of items on current page (0-indexed) */
  pageStart: Readonly<Ref<number>>;
  /** End index of items on current page (exclusive, 0-indexed) */
  pageStop: Readonly<Ref<number>>;
  /** Whether current page is the first page */
  isFirst: Readonly<Ref<boolean>>;
  /** Whether current page is the last page */
  isLast: Readonly<Ref<boolean>>;
  /** Go to first page */
  first: () => void;
  /** Go to last page */
  last: () => void;
  /** Go to next page */
  next: () => void;
  /** Go to previous page */
  prev: () => void;
  /** Go to specific page */
  select: (value: number) => void;
}
interface PaginationOptions {
  /** Initial page or ref for v-model (1-indexed). @default 1 */
  page?: number | ShallowRef<number>;
  /** Items per page. @default 10 */
  itemsPerPage?: MaybeRefOrGetter<number>;
  /** Total number of items. @default 0 */
  size?: MaybeRefOrGetter<number>;
  /** Maximum visible page buttons. @default 7 */
  visible?: MaybeRefOrGetter<number>;
  /** Ellipsis character. @default '...' */
  ellipsis?: string | false;
}
interface PaginationContextOptions extends PaginationOptions {
  /** Namespace for dependency injection */
  namespace?: string;
}
/**
 * Creates a pagination instance.
 *
 * @param options The options for the pagination instance.
 * @returns A pagination context with navigation methods.
 *
 * @example
 * ```ts
 * import { createPagination } from '@vuetify/v0'
 *
 * // Basic usage
 * const pagination = createPagination({ size: 100 })
 * pagination.next()
 * pagination.items.value // [{ type: 'page', value: 1 }, { type: 'page', value: 2 }, ...]
 *
 * // With v-model (pass a ref)
 * const page = ref(1)
 * const pagination = createPagination({ page, size: 100 })
 * // Mutating pagination.page or the passed ref syncs both
 * ```
 */
declare function createPagination(_options?: PaginationOptions): PaginationContext;
/**
 * Creates a pagination context for dependency injection.
 *
 * @param options The options including namespace.
 * @returns A trinity: [usePagination, providePagination, defaultContext]
 *
 * @example
 * ```ts
 * // With default namespace 'v0:pagination'
 * const [usePagination, providePaginationContext] = createPaginationContext({ size: 50 })
 *
 * // Or with custom namespace
 * const [usePagination, providePaginationContext] = createPaginationContext({
 *   namespace: 'my-pagination',
 *   size: 50,
 * })
 *
 * // Parent component
 * providePaginationContext()
 *
 * // Child component
 * const pagination = usePagination()
 * pagination.next()
 * ```
 */
declare function createPaginationContext(_options?: PaginationContextOptions): ContextTrinity<PaginationContext>;
/**
 * Returns the current pagination instance from context.
 *
 * @param namespace The namespace. @default 'v0:pagination'
 * @returns The pagination context.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *  import { usePagination } from '@vuetify/v0'
 *
 *  const pagination = usePagination()
 * </script>
 *
 * <template>
 *   <button @click="pagination.prev()" :disabled="pagination.isFirst.value">Prev</button>
 *   <button @click="pagination.next()" :disabled="pagination.isLast.value">Next</button>
 * </template>
 * ```
 */
declare function usePagination(namespace?: string): PaginationContext;
//#endregion
//#region src/composables/createDataTable/adapters/adapter.d.ts
type SortDirection = 'asc' | 'desc' | 'none';
interface SortEntry {
  key: string;
  direction: SortDirection;
}
/** Inputs provided by createDataTable to the adapter */
interface DataTableAdapterContext<T extends object> {
  /** Source items */
  items: MaybeRefOrGetter<T[]>;
  /** Search query ref */
  search: ShallowRef<string>;
  /** Column ids eligible for filtering (reactive — tracks the columns registry) */
  filterableKeys: MaybeRefOrGetter<readonly string[]>;
  /** Current sort state derived from sort controls */
  sortBy: Readonly<Ref<SortEntry[]>>;
  /** Locale for sorting (reactive, from useLocale or options) */
  locale: Readonly<Ref<string | undefined>>;
  /** Filter options (keys excluded, derived from columns) */
  filterOptions: Omit<FilterOptions, 'keys'>;
  /** Pagination options (size excluded, derived from pipeline) */
  paginationOptions: Omit<PaginationOptions, 'size'>;
  /** Per-column custom sort comparators (reactive — tracks the columns registry). Keys are column ids, which may be `keyof T` or derived strings. */
  customSorts: MaybeRefOrGetter<Partial<Record<string, (a: unknown, b: unknown) => number>>>;
  /** Per-column custom filter functions (reactive — tracks the columns registry). Keys are column ids, which may be `keyof T` or derived strings. */
  customColumnFilters: MaybeRefOrGetter<Partial<Record<string, (value: unknown, query: string) => boolean>>>;
}
/** Outputs returned by the adapter to createDataTable */
interface DataTableAdapterResult<T extends object> {
  /** Raw unprocessed items */
  allItems: Readonly<Ref<readonly T[]>>;
  /** Items after filtering */
  filteredItems: Readonly<Ref<readonly T[]>>;
  /** Items after filtering and sorting */
  sortedItems: Readonly<Ref<readonly T[]>>;
  /** Final visible items (paginated or virtualized) */
  items: Readonly<Ref<readonly T[]>>;
  /** Pagination controls */
  pagination: PaginationContext;
  /** Total row count for aria-rowcount */
  total: Readonly<Ref<number>>;
  /** Loading state (optional, for async adapters) */
  loading?: Readonly<Ref<boolean>>;
  /** Error state (optional, for async adapters) */
  error?: Readonly<Ref<Error | null>>;
}
declare abstract class DataTableAdapter<T extends object> {
  /** Create the filter pipeline stage */
  protected filter(context: DataTableAdapterContext<T>): {
    allItems: Readonly<Ref<T[]>>;
    filteredItems: Readonly<Ref<readonly T[]>>;
  };
  /** Create the sort pipeline stage */
  protected sort(filteredItems: Readonly<Ref<readonly T[]>>, sortBy: Readonly<Ref<SortEntry[]>>, locale?: Readonly<Ref<string | undefined>>, customSorts?: MaybeRefOrGetter<Partial<Record<string, (a: unknown, b: unknown) => number>>>): Readonly<Ref<readonly T[]>>;
  abstract setup(context: DataTableAdapterContext<T>): DataTableAdapterResult<T>;
}
//#endregion
export { createFilterContext as C, createFilter as S, FilterMode as _, SortEntry as a, FilterResult as b, PaginationOptions as c, createPaginationContext as d, usePagination as f, FilterItem as g, FilterFunction as h, SortDirection as i, PaginationTicket as l, FilterContextOptions as m, DataTableAdapterContext as n, PaginationContext as o, FilterContext as p, DataTableAdapterResult as r, PaginationContextOptions as s, DataTableAdapter as t, createPagination as u, FilterOptions as v, useFilter as w, Primitive as x, FilterQuery as y };