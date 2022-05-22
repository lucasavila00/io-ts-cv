import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsAscii } from "../../string/IsAscii";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsAscii", () => {
  it("works unwrapped", () => {
    const codec = IsAscii;

    expect(E.isRight(codec.decode("abc"))).toBe(true);
    expect(E.isRight(codec.decode("abcd"))).toBe(true);
    expect(getErrorMessages(codec.decode("à"))).toMatchInlineSnapshot(
      `"it must contain only ASCII characters"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsAscii,
    });

    expect(getErrorMessages(theType.decode({ a: "à" }))).toMatchInlineSnapshot(
      `"a must contain only ASCII characters"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "à" } }))
    ).toMatchInlineSnapshot(`"b.a must contain only ASCII characters"`);
  });
});
