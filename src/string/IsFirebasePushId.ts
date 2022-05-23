import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

export interface IsFirebasePushIdBrand {
  readonly IsFirebasePushId: unique symbol;
}

const webSafeRegex = /^[a-zA-Z0-9_-]*$/;
const isFirebasePushId = (value: string): boolean =>
  value.length === 20 && webSafeRegex.test(value);

/**
 * Checks if the string is a Firebase Push Id
 */
export const IsFirebasePushId = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsFirebasePushIdBrand> =>
      isFirebasePushId(value),
    "IsFirebasePushId"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a Firebase Push Id`
);
