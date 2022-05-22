import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import containsValidator from "validator/lib/contains";
import { nameFromCtx } from "../utils/ctx";

type ContainsBrand<T extends string> = {
  readonly [K in `Contains_${T}`]: symbol;
};

/**
 * Checks if the string contains the seed.
 */
export const Contains = <T extends string>(seed: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, ContainsBrand<T>> =>
        containsValidator(value, seed),
      ("Contains_" + seed) as `Contains_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must contain a ${seed} string`
  );
