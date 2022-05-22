import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsHalfWidth } from "../../string/IsHalfWidth";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsHalfWidth", () => {
  it("works unwrapped", () => {
    const codec = IsHalfWidth;

    expect(E.isRight(codec.decode("｣"))).toBe(true);
    expect(getErrorMessages(codec.decode("￠"))).toMatchInlineSnapshot(
      `"it must contain any half-width characters"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsHalfWidth,
    });

    expect(getErrorMessages(theType.decode({ a: "￠" }))).toMatchInlineSnapshot(
      `"a must contain any half-width characters"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "￠" } }))
    ).toMatchInlineSnapshot(`"b.a must contain any half-width characters"`);
  });
});
