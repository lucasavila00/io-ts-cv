import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

interface ArrayNotEmptyBrand {
  readonly ArrayNotEmpty: unique symbol;
}
/**
 * Checks if the array's length is greater than or equal to the specified number.
 * @deprecated Use fp-ts's `NonEmptyArray` instead.
 */
export const ArrayNotEmpty = <CODEC extends t.Mixed>(codec: CODEC) =>
  withMessage(
    t.brand(
      t.array(codec),
      (value): value is t.Branded<t.TypeOf<CODEC>[], ArrayNotEmptyBrand> =>
        value.length > 0,
      "ArrayNotEmpty"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} should not be emtpty`
  );
