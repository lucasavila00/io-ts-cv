import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsBase32 } from "../../src/string/IsBase32";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsBase32", () => {
  it("works unwrapped", () => {
    const codec = IsBase32;

    expect(E.isRight(codec.decode("MFRGG==="))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be base32 encoded"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsBase32,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be base32 encoded"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be base32 encoded"`);
  });
});
