import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import matchesValidator from "validator/lib/matches";
import { nameFromCtx } from "../utils/ctx";

const matches = (
  value: string,
  pattern: RegExp | string,
  modifiers?: string
): boolean => matchesValidator(value, pattern as unknown as any, modifiers);

interface MatchesBrand {
  readonly Matches: unique symbol;
}

/**
 * Checks if string matches the pattern. Either matches('foo', /foo/i)
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const Matches = (pattern: RegExp | string, modifiers?: string) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, MatchesBrand> =>
        matches(value, pattern, modifiers),
      "Matches"
    ),
    (_value, ctx) =>
      `${nameFromCtx(ctx)} must match ${pattern} regular expression`
  );
