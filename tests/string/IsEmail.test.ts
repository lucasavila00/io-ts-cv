import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsEmail } from "../../src/string/IsEmail";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsEmail", () => {
  it("works unwrapped", () => {
    const codec = IsEmail();

    expect(E.isRight(codec.decode("abc@def.com"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be an email"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsEmail(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be an email"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be an email"`);
  });
});
