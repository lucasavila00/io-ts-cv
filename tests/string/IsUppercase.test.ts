import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsUppercase } from "../../string/IsUppercase";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsUppercase", () => {
  it("works unwrapped", () => {
    const codec = IsUppercase;

    expect(E.isRight(codec.decode("A"))).toBe(true);
    expect(getErrorMessages(codec.decode("a"))).toMatchInlineSnapshot(
      `"it must be uppercase"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsUppercase,
    });

    expect(getErrorMessages(theType.decode({ a: "a" }))).toMatchInlineSnapshot(
      `"a must be uppercase"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "a" } }))
    ).toMatchInlineSnapshot(`"b.a must be uppercase"`);
  });
});
