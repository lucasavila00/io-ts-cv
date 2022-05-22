import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isJSONValidator from "validator/lib/isJSON";

interface IsJSONBrand {
  readonly IsJSON: unique symbol;
}

/**
 * Checks if the string is valid JSON (note: uses JSON.parse).
 */
export const IsJSON = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsJSONBrand> => isJSONValidator(value),
    "IsJSON"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a json string`
);
