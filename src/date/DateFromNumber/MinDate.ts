import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../../utils/ctx";
import { DateFromNumber } from "io-ts-types/lib/DateFromNumber";

type DateFromNumberMinDateBrand<T extends number> = {
  readonly [K in `DateFromNumberMinDate_${T}`]: symbol;
};

/**
 * Checks if the value is a date that's after the specified date.
 */
export const DateFromNumberMinDate = <T extends number>(minNumber: T) =>
  withMessage(
    t.brand(
      DateFromNumber,
      (
        value
      ): value is t.Branded<
        t.TypeOf<typeof DateFromNumber>,
        DateFromNumberMinDateBrand<T>
      > => value.getTime() >= new Date(minNumber).getTime(),
      ("DateFromNumberMinDate_" + minNumber) as `DateFromNumberMinDate_${T}`
    ),
    (_value, ctx) =>
      `minimal allowed date for ${nameFromCtx(ctx)} is ${new Date(
        minNumber
      ).toISOString()}`
  );
