import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsPositive } from "../../src/number/IsPositive";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsPositive", () => {
  it("works unwrapped", () => {
    const codec = IsPositive;

    expect(E.isRight(codec.decode(1))).toBe(true);

    expect(getErrorMessages(codec.decode(-2))).toMatchInlineSnapshot(
      `"it must be a positive number"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsPositive,
    });

    expect(getErrorMessages(theType.decode({ a: -2 }))).toMatchInlineSnapshot(
      `"a must be a positive number"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: -2 } }))
    ).toMatchInlineSnapshot(`"b.a must be a positive number"`);
  });
});
