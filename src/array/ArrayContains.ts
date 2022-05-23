import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

export interface ArrayContainsBrand {
  readonly ArrayContains: unique symbol;
}

const arrayContains = <T extends any[], U extends any[]>(
  array: T,
  values: U
): boolean => values.every((value) => array.indexOf(value) !== -1);

/**
 * Checks if array contains all values from the given array of values.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const ArrayContains = <CODEC extends t.Mixed>(
  codec: CODEC,
  values: t.TypeOf<CODEC>[]
) =>
  withMessage(
    t.brand(
      t.array(codec),
      (value): value is t.Branded<t.TypeOf<CODEC>[], ArrayContainsBrand> =>
        arrayContains(value, values),
      "ArrayContains"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must contain ${values} values`
  );
