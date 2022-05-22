import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

/**
 * Checks if value matches ("===") the comparison.
 * @deprecated Use io-ts' `literal` instead.
 */
export const Equals = <T extends string | number | boolean>(it: T) =>
  withMessage(
    t.literal(it),
    (_value, ctx) => `${nameFromCtx(ctx)} must be equal to ${it}`
  );
