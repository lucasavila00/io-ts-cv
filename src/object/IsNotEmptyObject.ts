import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

type IsNotEmptyObjectBrand<T extends boolean> = {
  readonly [K in `IsNotEmptyObject_${T}`]: symbol;
};

function isNotEmptyObject(
  value: t.TypeOf<typeof t.UnknownRecord>,
  nullable?: boolean
): boolean {
  if (nullable === true) {
    return !Object.values(value).every(
      (propertyValue) => propertyValue === null || propertyValue === undefined
    );
  }

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      return true;
    }
  }

  return false;
}

/**
 * Checks if the value is valid Object & not empty.
 * Returns false if the value is not an object or an empty valid object.
 */
export const IsNotEmptyObject = <N extends boolean>(removeNullables?: N) =>
  withMessage(
    t.brand(
      t.UnknownRecord,
      (
        value
      ): value is t.Branded<
        t.TypeOf<typeof t.UnknownRecord>,
        IsNotEmptyObjectBrand<N>
      > => isNotEmptyObject(value, removeNullables),
      ("IsNotEmptyObject_" + removeNullables) as `IsNotEmptyObject_${N}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a non-empty object`
  );
