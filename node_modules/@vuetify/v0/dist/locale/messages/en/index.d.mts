//#region src/locale/messages/en/index.d.ts
/**
 * @module locale/messages/en
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-locale
 *
 * @remarks
 * Built-in English aria strings for @vuetify/v0 components. These are the
 * same keys that components pass to `locale.t()`. Importing this module and
 * passing it to `createLocalePlugin` satisfies WCAG 4.1.2 Name, Role, Value
 * without writing custom translations.
 *
 * @example
 * ```ts
 * import en from '@vuetify/v0/locale/messages/en'
 * import { createLocalePlugin } from '@vuetify/v0/locale'
 *
 * app.use(createLocalePlugin({ messages: { en }, default: 'en' }))
 * ```
 */
declare const _default: {
  readonly AlertDialog: {
    readonly close: "Close";
  };
  readonly Avatar: {
    readonly indicatorLabel: "+{count} more";
  };
  readonly Breadcrumbs: {
    readonly expand: "Show {count} more breadcrumbs";
    readonly label: "Breadcrumbs";
  };
  readonly Button: {
    readonly label: "Button";
  };
  readonly Carousel: {
    readonly indicator: "Go to slide {current} of {size}";
    readonly indicators: "Carousel indicators";
    readonly label: "Carousel";
    readonly liveRegion: "Slide {current} of {size}";
    readonly next: "Next slide";
    readonly prev: "Previous slide";
    readonly progress: "{percent}% complete";
    readonly progressLabel: "Carousel progress";
    readonly slide: "Slide {current} of {size}";
  };
  readonly Combobox: {
    readonly noResults: "No results";
  };
  readonly DataGrid: {
    readonly resizeHandle: "Resize column";
  };
  readonly Dialog: {
    readonly close: "Close";
  };
  readonly Input: {
    readonly required: "Required";
  };
  readonly NumberField: {
    readonly decrement: "Decrement";
    readonly increment: "Increment";
    readonly label: "Number";
  };
  readonly Pagination: {
    readonly currentPage: "Page {page}, current";
    readonly first: "First page";
    readonly goToPage: "Go to page {page}";
    readonly label: "Pagination";
    readonly last: "Last page";
    readonly next: "Next page";
    readonly prev: "Previous page";
    readonly status: "Page {page} of {pages}";
  };
  readonly Rating: {
    readonly label: "Rating";
    readonly valueText: "{value} of {size} stars";
  };
  readonly Slider: {
    readonly label: "Slider";
  };
  readonly Snackbar: {
    readonly close: "Dismiss";
  };
  readonly Splitter: {
    readonly handle: "Resize";
    readonly releaseToHide: "Release to hide";
    readonly releaseToOpen: "Release to open";
  };
};
//#endregion
export { _default as default };