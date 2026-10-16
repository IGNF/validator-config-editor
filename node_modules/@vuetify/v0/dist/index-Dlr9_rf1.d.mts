import { t as ContextTrinity } from "./index-ClUa0Bl7.mjs";
import { n as RegistryContextOptions, o as RegistryOptions, s as RegistryTicket, t as RegistryContext } from "./index-Y6VfllT2.mjs";
//#region src/composables/createTokens/index.d.ts
interface TokenAlias<T = unknown> {
  [key: string]: unknown;
  $value: T;
  $type?: string;
  $description?: string;
  $extensions?: Record<string, unknown>;
  $deprecated?: boolean | string;
}
type TokenPrimitive = string | number | boolean | null | Function;
type TokenValue = TokenPrimitive | TokenAlias | TokenCollection;
interface TokenCollection {
  [key: string]: TokenValue | TokenCollection;
}
type FlatTokenCollection = {
  id: string;
  value: TokenValue;
};
interface TokenTicket<Z extends TokenValue = TokenValue> extends RegistryTicket<Z> {}
interface TokenContext<Z extends TokenTicket> extends RegistryContext<Z> {
  /**
   * Checks if a token is an alias
   *
   * @param token The token to check.
   * @returns True if the token is an alias, false otherwise.
   * @remarks An alias is a string that starts with "{" and ends with "}".
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-tokens
   *
   * @example
   * ```ts
   * const tokens = createTokens({
   *   colors: {
   *     primary: '#3b82f6',
   *     secondary: '{colors.primary}', // Alias reference
   *   },
   * })
   *
   * console.log(tokens.isAlias('{colors.primary}')) // true
   * console.log(tokens.isAlias('#3b82f6')) // false
   * ```
   */
  isAlias: (token: unknown) => token is string;
  /**
   * Resolves a token or alias to its value.
   *
   * @param token The token or alias to resolve.
   * @returns The resolved value of the token or alias, or undefined if not found.
   * @remarks This function can resolve nested aliases and supports token paths using dot notation.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-tokens
   *
   * @example
   * ```ts
   * const tokens = createTokens({
   *   colors: {
   *     primary: '#3b82f6',
   *     secondary: '{colors.primary}', // Alias reference
   *   },
   * })
   *
   * console.log(tokens.resolve('{colors.primary}')) // '#3b82f6'
   * console.log(tokens.resolve('{colors.secondary}')) // '#3b82f6'
   * ```
   */
  resolve: <T = unknown>(token: string | TokenAlias) => T | undefined;
}
interface TokenOptions extends RegistryOptions {
  /**
   * Whether to flatten nested token structures.
   *
   * @default false
   */
  flat?: boolean;
  /**
   * An optional prefix to prepend to each token ID during registration.
   *
   * @remarks This is useful for namespacing tokens.
   */
  prefix?: string;
}
interface TokenContextOptions extends TokenOptions, RegistryContextOptions {
  tokens?: TokenCollection;
}
/**
 * Creates a new token instance.
 *
 * @param tokens The tokens to use.
 * @param options The options for the token instance.
 * @template Z The type of the token ticket.
 * @template E The type of the token context.
 * @returns A new token instance.
 *
 * @see https://www.designtokens.org/tr/drafts/format/
 * @see https://0.vuetifyjs.com/composables/registration/create-tokens
 *
 * @example
 * ```ts
 * import { createTokens } from '@vuetify/v0'
 *
 * const tokens = createTokens({
 *   colors: {
 *     primary: '#3b82f6',
 *     secondary: '{colors.primary}', // Alias reference
 *   },
 * })
 *
 * console.log(tokens.resolve('{colors.primary}')) // '#3b82f6'
 * console.log(tokens.resolve('{colors.secondary}')) // '#3b82f6'
 * ```
 */
declare function createTokens<Z extends TokenTicket = TokenTicket, E extends TokenContext<Z> = TokenContext<Z>>(tokens?: TokenCollection, options?: TokenOptions): E;
/**
 * Creates a new token context.
 *
 * @param options The options for the token context.
 * @template Z The type of the token ticket.
 * @template E The type of the token context.
 * @returns A new token context.
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-tokens
 *
 * @example
 * ```ts
 * import { createTokensContext } from '@vuetify/v0'
 *
 * export const [useTokens, provideTokens, context] = createTokensContext({
 *  namespace: 'v0:tokens',
 *  tokens: {
 *    colors: {
 *      primary: '#3b82f6',
 *      secondary: '{colors.primary}', // Alias reference
 *    },
 *  },
 * })
 * ```
 */
declare function createTokensContext<Z extends TokenTicket = TokenTicket, E extends TokenContext<Z> = TokenContext<Z>>(_options: TokenContextOptions): ContextTrinity<E>;
/**
 * Returns the current tokens instance.
 *
 * @param namespace The namespace for the tokens context. Defaults to `'v0:tokens'`.
 * @returns The current tokens instance.
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-tokens
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useTokens } from '@vuetify/v0'
 *
 *   const tokens = useTokens()
 * </script>
 * ```
 */
declare function useTokens<Z extends TokenTicket = TokenTicket, E extends TokenContext<Z> = TokenContext<Z>>(namespace?: string): E;
/**
 * Flattens a nested collection of tokens into a flat array of tokens.
 * Each token is represented by an object containing its ID & value.
 * @param tokens The collection of tokens to flatten.
 * @param prefix An optional prefix to prepend to each token ID.
 * @returns An array of flattened tokens, each with an ID and value.
 */
declare function flatten(tokens: TokenCollection, prefix?: string, flat?: boolean): FlatTokenCollection[];
//#endregion
export { TokenContextOptions as a, TokenTicket as c, createTokensContext as d, flatten as f, TokenContext as i, TokenValue as l, TokenAlias as n, TokenOptions as o, useTokens as p, TokenCollection as r, TokenPrimitive as s, FlatTokenCollection as t, createTokens as u };