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
  motd: Motd;
  success: boolean;
  base: string;
  date: string;
  rates: object;
}

export interface Motd {
  msg: string;
  url: string;
}

export interface Query {
  from: string;
  to: string;
  amount: number;
}

export interface Info {
  rate?: any;
}

export interface IRates {
  motd: Motd;
  success: boolean;
  query: Query;
  info: Info;
  historical: boolean;
  date: string;
  result?: any;
}

export enum Duration {
  "7 Days" = "7 Days",
  "15 Days" = "15 Days",
  "30 Days" = "30 Days"
}
