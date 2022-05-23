import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isMongoIdValidator from "validator/lib/isMongoId";

export interface IsMongoIdBrand {
  readonly IsMongoId: unique symbol;
}

/**
 * Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.
 */
export const IsMongoId = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsMongoIdBrand> =>
      isMongoIdValidator(value),
    "IsMongoId"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a mongodb id`
);
