import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsNegative } from "../../src/number/IsNegative";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsNegative", () => {
  it("works unwrapped", () => {
    const codec = IsNegative;

    expect(E.isRight(codec.decode(-1))).toBe(true);

    expect(getErrorMessages(codec.decode(2))).toMatchInlineSnapshot(
      `"it must be a negative number"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsNegative,
    });

    expect(getErrorMessages(theType.decode({ a: 2 }))).toMatchInlineSnapshot(
      `"a must be a negative number"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: 2 } }))
    ).toMatchInlineSnapshot(`"b.a must be a negative number"`);
  });
});
