import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

export interface IsNotInBrand {
  readonly IsNotIn: unique symbol;
}

const isNotIn = <T extends any[], U>(blockList: T, value: U): boolean =>
  !blockList.some((blocked) => blocked === value);

/**
 * Checks if given value not in a array of allowed values.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const IsNotIn = <CODEC extends t.Mixed>(
  codec: CODEC,
  blockList: t.TypeOf<CODEC>[]
) =>
  withMessage(
    t.brand(
      codec,
      (value): value is t.Branded<t.TypeOf<CODEC>, IsNotInBrand> =>
        isNotIn(blockList, value),
      "IsNotIn"
    ),
    (_value, ctx) =>
      `${nameFromCtx(
        ctx
      )} should not be one of the following values: ${blockList}`
  );
