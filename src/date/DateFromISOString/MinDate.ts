import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../../utils/ctx";
import { DateFromISOString } from "io-ts-types/lib/DateFromISOString";

type DateFromISOStringMinDateBrand<T extends string> = {
  readonly [K in `DateFromISOStringMinDate_${T}`]: symbol;
};

/**
 * Checks if the value is a date that's after the specified date.
 */
export const DateFromISOStringMinDate = <T extends string>(minIsoString: T) =>
  withMessage(
    t.brand(
      DateFromISOString,
      (
        value
      ): value is t.Branded<
        t.TypeOf<typeof DateFromISOString>,
        DateFromISOStringMinDateBrand<T>
      > => value.getTime() >= new Date(minIsoString).getTime(),
      ("DateFromISOStringMinDate_" +
        minIsoString) as `DateFromISOStringMinDate_${T}`
    ),
    (_value, ctx) =>
      `minimal allowed date for ${nameFromCtx(ctx)} is ${minIsoString}`
  );
