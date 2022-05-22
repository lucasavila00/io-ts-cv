import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsOctal } from "../../string/IsOctal";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsOctal", () => {
  it("works unwrapped", () => {
    const codec = IsOctal;

    expect(E.isRight(codec.decode("1"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be valid octal number"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsOctal,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be valid octal number"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be valid octal number"`);
  });
});
