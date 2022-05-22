import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../../utils/ctx";
import { DateFromNumber } from "io-ts-types/lib/DateFromNumber";

type DateFromNumberMaxDateBrand<T extends number> = {
  readonly [K in `DateFromNumberMaxDate_${T}`]: symbol;
};

/**
 * Checks if the value is a date that's before the specified date.
 */
export const DateFromNumberMaxDate = <T extends number>(maxNumber: T) =>
  withMessage(
    t.brand(
      DateFromNumber,
      (
        value
      ): value is t.Branded<
        t.TypeOf<typeof DateFromNumber>,
        DateFromNumberMaxDateBrand<T>
      > => value.getTime() <= new Date(maxNumber).getTime(),
      ("DateFromNumberMaxDate_" + maxNumber) as `DateFromNumberMaxDate_${T}`
    ),
    (_value, ctx) =>
      `maximal allowed date for ${nameFromCtx(ctx)} is ${new Date(
        maxNumber
      ).toISOString()}`
  );
