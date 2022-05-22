import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsHSL } from "../../string/IsHSL";
import { getMessages as getErrorMessages } from "../utils/validation-messages";

describe("IsHSL", () => {
  it("works unwrapped", () => {
    const codec = IsHSL;

    expect(E.isRight(codec.decode("hsl(0, 100%, 50%)"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a HSL color"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsHSL,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a HSL color"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a HSL color"`);
  });
});
