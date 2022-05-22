import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { Matches } from "../../string/Matches";
import { getErrorMessages } from "../utils/validation-messages";

describe("Matches", () => {
  it("works unwrapped", () => {
    const codec = Matches("[a-z]");

    expect(E.isRight(codec.decode("a"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must match [a-z] regular expression"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: Matches("[a-z]"),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must match [a-z] regular expression"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must match [a-z] regular expression"`);
  });
});
