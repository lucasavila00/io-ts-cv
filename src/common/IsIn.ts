import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

interface IsInBrand {
  readonly IsIn: unique symbol;
}

const isIn = <T extends any[], U>(allowList: T, value: U): boolean =>
  allowList.some((allowed) => allowed === value);

/**
 * Checks if given value is in a array of allowed values.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const IsIn = <CODEC extends t.Mixed>(
  codec: CODEC,
  allowList: t.TypeOf<CODEC>[]
) =>
  withMessage(
    t.brand(
      codec,
      (value): value is t.Branded<t.TypeOf<CODEC>, IsInBrand> =>
        isIn(allowList, value),
      "IsIn"
    ),
    (_value, ctx) =>
      `${nameFromCtx(ctx)} must be one of the following values: ${allowList}`
  );
