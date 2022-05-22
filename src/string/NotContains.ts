import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import containsValidator from "validator/lib/contains";
import { nameFromCtx } from "../utils/ctx";

type NotContainsBrand<T extends string> = {
  readonly [K in `NotContains_${T}`]: symbol;
};

/**
 * Checks if the string does not contain the seed.
 */
export const NotContains = <T extends string>(seed: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, NotContainsBrand<T>> =>
        !containsValidator(value, seed),
      ("NotContains_" + seed) as `NotContains_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must not contain a ${seed} string`
  );
