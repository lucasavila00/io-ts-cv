import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../../utils/ctx";
import { DateFromUnixTime } from "io-ts-types/lib/DateFromUnixTime";

type DateFromUnixTimeMinDateBrand<T extends number> = {
  readonly [K in `DateFromUnixTimeMinDate_${T}`]: symbol;
};

/**
 * Checks if the value is a date that's after the specified date.
 */
export const DateFromUnixTimeMinDate = <T extends number>(minUnixTime: T) =>
  withMessage(
    t.brand(
      DateFromUnixTime,
      (
        value
      ): value is t.Branded<
        t.TypeOf<typeof DateFromUnixTime>,
        DateFromUnixTimeMinDateBrand<T>
      > => value.getTime() >= new Date(minUnixTime * 1000).getTime(),
      ("DateFromUnixTimeMinDate_" +
        minUnixTime) as `DateFromUnixTimeMinDate_${T}`
    ),
    (_value, ctx) =>
      `minimal allowed date for ${nameFromCtx(ctx)} is ${new Date(
        minUnixTime
      ).toISOString()}`
  );
