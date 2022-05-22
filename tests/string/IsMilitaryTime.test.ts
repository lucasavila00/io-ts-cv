import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsMilitaryTime } from "../../string/IsMilitaryTime";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsMilitaryTime", () => {
  it("works unwrapped", () => {
    const codec = IsMilitaryTime;

    expect(E.isRight(codec.decode("01:02"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be a valid representation of military time in the format HH:MM"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsMilitaryTime,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be a valid representation of military time in the format HH:MM"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(
      `"b.a must be a valid representation of military time in the format HH:MM"`
    );
  });
});
