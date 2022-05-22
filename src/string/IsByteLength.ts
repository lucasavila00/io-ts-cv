import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isByteLengthValidator from "validator/lib/isByteLength";

type IsByteLengthBrand<T extends number, U extends number> = {
  readonly [K in `IsByteLength_${T}_${U}`]: symbol;
};

/**
 * Checks if the string's length (in bytes) falls in a range.
 */
export const IsByteLength = <T extends number, U extends number>(
  min: T,
  max?: U
) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsByteLengthBrand<T, U>> =>
        isByteLengthValidator(value, { min, max }),
      `IsByteLength_${min}_${max}` as `IsByteLength_${T}_${U}`
    ),
    (_value, ctx) =>
      `${nameFromCtx(ctx)}'s byte length must fall into (${min}, ${max}) range`
  );
