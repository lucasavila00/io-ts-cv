import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsBase64 } from "../../string/IsBase64";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsBase64", () => {
  it("works unwrapped", () => {
    const codec = IsBase64;

    expect(E.isRight(codec.decode("YWJj"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be base64 encoded"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsBase64,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be base64 encoded"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be base64 encoded"`);
  });
});
