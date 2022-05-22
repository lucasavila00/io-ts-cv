import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isLatLongValidator from "validator/lib/isLatLong";

type IsLongitudeBrand = {
  readonly IsLongitude: unique symbol;
};

/**
 * Checks if a given value is a longitude.
 */
export const IsLongitude = <CODEC extends t.NumberType | t.StringType>(
  codec: CODEC
) =>
  withMessage(
    t.brand(
      codec,
      (value): value is t.Branded<t.TypeOf<CODEC>, IsLongitudeBrand> =>
        isLatLongValidator(`0,${value}`),
      "IsLongitude"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a longitude string or number`
  );
