import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isLatLongValidator from "validator/lib/isLatLong";
import { nameFromCtx } from "../utils/ctx";

interface IsLatLongBrand {
  readonly IsLatLong: unique symbol;
}

/**
 * Checks if a value is string in format a "latitude,longitude".
 */
export const IsLatLong = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsLatLongBrand> =>
      isLatLongValidator(value),
    "IsLatLong"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a latitude,longitude string`
);
