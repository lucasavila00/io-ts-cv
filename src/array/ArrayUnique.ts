import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

export interface ArrayUniqueBrand {
  readonly ArrayUnique: unique symbol;
}

type ArrayUniqueIdentifier<T> = (
  o: T
) => string | number | bigint | boolean | null | undefined;

const arrayUnique = <T>(
  array: T[],
  identifier?: ArrayUniqueIdentifier<T>
): boolean => {
  const idArray =
    identifier != null
      ? array.map((o) => (o != null ? identifier(o) : o))
      : array;

  const uniqueItems = idArray.filter((a, b, c) => c.indexOf(a) === b);
  return idArray.length === uniqueItems.length;
};

/**
 * Checks if all array's values are unique. Comparison for objects is reference-based.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const ArrayUnique = <CODEC extends t.Mixed>(
  codec: CODEC,
  identifier?: ArrayUniqueIdentifier<t.TypeOf<CODEC>>
) =>
  withMessage(
    t.brand(
      t.array(codec),
      (value): value is t.Branded<t.TypeOf<CODEC>[], ArrayUniqueBrand> =>
        arrayUnique(value, identifier),
      "ArrayUnique"
    ),
    (_value, ctx) => `All ${nameFromCtx(ctx)}'s elements must be unique`
  );
