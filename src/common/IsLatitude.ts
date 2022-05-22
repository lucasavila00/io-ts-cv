import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isLatLongValidator from "validator/lib/isLatLong";

type IsLatitudeBrand = {
  readonly IsLatitude: unique symbol;
};

/**
 * Checks if a given value is a longitude.
 */
export const IsLatitude = <CODEC extends t.NumberType | t.StringType>(
  codec: CODEC
) =>
  withMessage(
    t.brand(
      codec,
      (value): value is t.Branded<t.TypeOf<CODEC>, IsLatitudeBrand> =>
        isLatLongValidator(`${value},0`),
      "IsLatitude"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a latitude string or number`
  );
