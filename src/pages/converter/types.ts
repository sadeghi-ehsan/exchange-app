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

export const Duration = {
  "7": 7,
  "15": 15,
  "30": 3
};

export interface IRatesHistory extends Omit<IRates, "query" | "info" | "historical" | "date" | "result"> {
  timeseries: boolean;
  base: string;
  start_date: string;
  end_date: string;
  rates: {};
}
