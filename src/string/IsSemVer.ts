import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isSemVerValidator from "validator/lib/isSemVer";

export interface IsSemVerBrand {
  readonly IsSemVer: unique symbol;
}

/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 */
export const IsSemVer = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsSemVerBrand> =>
      isSemVerValidator(value),
    "IsSemVer"
  ),
  (_value, ctx) =>
    `${nameFromCtx(ctx)} must be a Semantic Versioning Specification`
);
