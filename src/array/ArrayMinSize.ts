import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

type ArrayMinSizeBrand<T extends number> = {
  readonly [K in `ArrayMinSize_${T}`]: symbol;
};

/**
 * Checks if the array's length is greater than or equal to the specified number.
 */
export const ArrayMinSize = <CODEC extends t.Mixed, N extends number>(
  codec: CODEC,
  min: N
) =>
  withMessage(
    t.brand(
      t.array(codec),
      (value): value is t.Branded<t.TypeOf<CODEC>[], ArrayMinSizeBrand<N>> =>
        value.length >= min,
      ("ArrayMinSize_" + min) as `ArrayMinSize_${N}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must contain at least ${min} elements`
  );
