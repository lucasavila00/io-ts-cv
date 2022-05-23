import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import matchesValidator from "validator/lib/matches";

export interface IsMilitaryTimeBrand {
  readonly IsMilitaryTime: unique symbol;
}

const militaryTimeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
const isMilitaryTime = (value: string): boolean =>
  matchesValidator(value, militaryTimeRegex);

/**
 * Checks if the string represents a time without a given timezone in the format HH:MM (military).
 * If the given value does not match the pattern HH:MM, then it returns false.
 */
export const IsMilitaryTime = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsMilitaryTimeBrand> =>
      isMilitaryTime(value),
    "IsMilitaryTime"
  ),
  (_value, ctx) =>
    `${nameFromCtx(
      ctx
    )} must be a valid representation of military time in the format HH:MM`
);
