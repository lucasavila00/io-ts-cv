import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../../utils/ctx";
import { DateFromISOString } from "io-ts-types/lib/DateFromISOString";

type DateFromISOStringMaxDateBrand<T extends string> = {
  readonly [K in `DateFromISOStringMaxDate_${T}`]: symbol;
};

/**
 * Checks if the value is a date that's before the specified date.
 */
export const DateFromISOStringMaxDate = <T extends string>(maxIsoString: T) =>
  withMessage(
    t.brand(
      DateFromISOString,
      (
        value
      ): value is t.Branded<
        t.TypeOf<typeof DateFromISOString>,
        DateFromISOStringMaxDateBrand<T>
      > => value.getTime() <= new Date(maxIsoString).getTime(),
      ("DateFromISOStringMaxDate_" +
        maxIsoString) as `DateFromISOStringMaxDate_${T}`
    ),
    (_value, ctx) =>
      `maximal allowed date for ${nameFromCtx(ctx)} is ${maxIsoString}`
  );
