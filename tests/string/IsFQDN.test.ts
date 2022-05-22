import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsFQDN } from "../../string/IsFQDN";
import { getMessages as getErrorMessages } from "../utils/validation-messages";

describe("IsFQDN", () => {
  it("works unwrapped", () => {
    const codec = IsFQDN();

    expect(E.isRight(codec.decode("def.com"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a valid domain name"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsFQDN(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a valid domain name"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a valid domain name"`);
  });
});
