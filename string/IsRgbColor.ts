import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isRgbColorValidator from "validator/lib/isRgbColor";

type IsRgbColorBrand<T extends boolean> = {
  readonly [K in `IsRgbColor_${T}`]: symbol;
};

/**
 * Check if the string is a rgb or rgba color.
 * `includePercentValues` defaults to true. If you don't want to allow to set rgb or rgba values with percents, like rgb(5%,5%,5%), or rgba(90%,90%,90%,.3), then set it to false.
 */
export const IsRgbColor = <T extends boolean>(includePercentValues?: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsRgbColorBrand<T>> =>
        isRgbColorValidator(value, includePercentValues),
      `IsRgbColor_${includePercentValues}` as `IsRgbColor_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be RGB color`
  );
