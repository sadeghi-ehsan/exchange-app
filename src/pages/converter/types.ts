/**
 * this is a returned object shape from latest endpoint
 * @example:
 * ```
 * {
 * "motd": {},
 * "success": true,
 * "base": "EUR",
 * "date": "2022-05-09",
 * "rates": {}
 * }
 *
 * ```
 */
export interface IExchange {
  motd: object;
  success: boolean;
  base: string;
  date: string;
  rates: object;
}
