import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../../utils/ctx";
import { DateFromUnixTime } from "io-ts-types/lib/DateFromUnixTime";

type DateFromUnixTimeMaxDateBrand<T extends number> = {
  readonly [K in `DateFromUnixTimeMaxDate_${T}`]: symbol;
};

/**
 * Checks if the value is a date that's before the specified date.
 */
export const DateFromUnixTimeMaxDate = <T extends number>(maxUnixTime: T) =>
  withMessage(
    t.brand(
      DateFromUnixTime,
      (
        value
      ): value is t.Branded<
        t.TypeOf<typeof DateFromUnixTime>,
        DateFromUnixTimeMaxDateBrand<T>
      > => value.getTime() <= new Date(maxUnixTime * 1000).getTime(),
      ("DateFromUnixTimeMaxDate_" +
        maxUnixTime) as `DateFromUnixTimeMaxDate_${T}`
    ),
    (_value, ctx) =>
      `maximal allowed date for ${nameFromCtx(ctx)} is ${new Date(
        maxUnixTime
      ).toISOString()}`
  );
