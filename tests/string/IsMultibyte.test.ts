import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsMultibyte } from "../../string/IsMultibyte";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsMultibyte", () => {
  it("works unwrapped", () => {
    const codec = IsMultibyte;

    expect(E.isRight(codec.decode("ç"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must contain one or more multibyte chars"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsMultibyte,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must contain one or more multibyte chars"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must contain one or more multibyte chars"`);
  });
});
