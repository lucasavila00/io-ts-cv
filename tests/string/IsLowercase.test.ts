import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsLowercase } from "../../string/IsLowercase";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsLowercase", () => {
  it("works unwrapped", () => {
    const codec = IsLowercase;

    expect(E.isRight(codec.decode("a"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be a lowercase string"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsLowercase,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be a lowercase string"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be a lowercase string"`);
  });
});
