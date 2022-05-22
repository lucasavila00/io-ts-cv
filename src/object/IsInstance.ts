import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

interface IsInstanceBrand {
  readonly IsInstance: unique symbol;
}

const isInstance = (
  object: unknown,
  targetTypeConstructor: new (...args: any[]) => any
): boolean =>
  targetTypeConstructor &&
  typeof targetTypeConstructor === "function" &&
  object instanceof targetTypeConstructor;

/**
 * Checks if the value is an instance of the specified object.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const IsInstance = <T extends new (...args: any[]) => any>(
  targetType: T
) =>
  withMessage(
    t.brand(
      t.unknown,
      (value): value is t.Branded<T, IsInstanceBrand> =>
        isInstance(value, targetType),
      "IsInstance"
    ),
    (_value, ctx) =>
      `${nameFromCtx(ctx)} must be an instance of ${targetType.name}`
  );
