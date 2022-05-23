import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

export interface ArrayNotContainsBrand {
  readonly ArrayNotContains: unique symbol;
}

const arrayNotContains = <T extends any[], U extends any[]>(
  array: T,
  values: U
): boolean => values.every((value) => array.indexOf(value) === -1);

/**
 * Checks if array does not contain any of the given values.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const ArrayNotContains = <CODEC extends t.Mixed>(
  codec: CODEC,
  values: t.TypeOf<CODEC>[]
) =>
  withMessage(
    t.brand(
      t.array(codec),
      (value): value is t.Branded<t.TypeOf<CODEC>[], ArrayNotContainsBrand> =>
        arrayNotContains(value, values),
      "ArrayNotContains"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} should not contain ${values} values`
  );
