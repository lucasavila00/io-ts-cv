import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isUuidValidator from "validator/lib/isUUID";

type UUIDVersion = "3" | "4" | "5" | "all" | 3 | 4 | 5;

type IsUUIDBrand<T extends string | number> = {
  readonly [K in `IsUUID_${T}`]: symbol;
};

/**
 * Checks if the string is a UUID (version 3, 4 or 5).
 */
export const IsUUID = <T extends UUIDVersion>(version: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsUUIDBrand<T>> =>
        isUuidValidator(value, version),
      ("IsUUID_" + version) as `IsUUID_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a UUID`
  );
