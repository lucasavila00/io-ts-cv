import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

type ArrayMaxSizeBrand<T extends number> = {
  readonly [K in `ArrayMaxSize_${T}`]: symbol;
};

/**
 * Checks if the array's length is less or equal to the specified number.
 */
export const ArrayMaxSize = <CODEC extends t.Mixed, N extends number>(
  codec: CODEC,
  max: N
) =>
  withMessage(
    t.brand(
      t.array(codec),
      (value): value is t.Branded<t.TypeOf<CODEC>[], ArrayMaxSizeBrand<N>> =>
        value.length <= max,
      ("ArrayMaxSize_" + max) as `ArrayMaxSize_${N}`
    ),
    (_value, ctx) =>
      `${nameFromCtx(ctx)} must contain not more than ${max} elements`
  );
