import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsJWT } from "../../src/string/IsJWT";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsJWT", () => {
  it("works unwrapped", () => {
    const codec = IsJWT;

    expect(
      E.isRight(
        codec.decode(
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
        )
      )
    ).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be a jwt string"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsJWT,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be a jwt string"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be a jwt string"`);
  });
});
