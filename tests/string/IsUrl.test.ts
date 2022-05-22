import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsUrl } from "../../src/string/IsUrl";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsUrl", () => {
  it("works unwrapped", () => {
    const codec = IsUrl();

    expect(E.isRight(codec.decode("ab.com"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be an URL address"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsUrl(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be an URL address"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be an URL address"`);
  });
});
