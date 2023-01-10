export const classJoin = (classes: (string | undefined)[]) =>
  classes
    .filter(cls => cls) // @ts-ignore
    .map((cls: string) => cls.trim())
    .join(" ");

/**
 * convert number to comma separated string with N decimal places
 * @param number
 * @param decimalPlaces default: 0
 * @param roundTheDecimals default: true
 *
 * @returns {string}
 *
 * @example
 * ```js
 * commaSeparator(123456.29999999, 4, true) // 123,456.3000
 * commaSeparator(123456.29999999, 4, false) // 123,456.2999
 * commaSeparator(123456789.29999999) // 123,456,789
 * ```
 */
export function commaSeparator(number: string | number, decimalPlaces: number = 0, roundTheDecimals = true): string {
  if (!isNumberOrNumberStr(number)) return undefined;
  let value: number | string = Number(number);

  if (roundTheDecimals) {
    // number with decimals with rounding last digit
    value = value.toFixed(decimalPlaces);
  } else {
    // number with decimals without rounding
    value = (Math.floor(value * 10 ** decimalPlaces) / 10 ** decimalPlaces).toFixed(decimalPlaces);
  }

  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
}

/** checks if param is number */
export const isNumber = (val: any) => typeof val === "number";

/** checks if param is string */
export const isString = (val: any) => typeof val === "string";

/** checks if param is number in value */
export const isNumberOrNumberStr = (val: any) => isNumber(val) || isNumberString(val);

/** checks if param is number string */
export const isNumberString = (val: any) => isString(val) && !isNaN(Number(val));
