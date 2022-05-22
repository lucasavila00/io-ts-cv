import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { ArrayNotContains } from "../../src/array/ArrayNotContains";
import { getErrorMessages } from "../utils/validation-messages";

describe("ArrayNotContains", () => {
  it("works unwrapped", () => {
    const codec = ArrayNotContains(t.string, ["a"]);

    expect(E.isRight(codec.decode(["b"]))).toBe(true);
    expect(getErrorMessages(codec.decode(["a", "b"]))).toMatchInlineSnapshot(
      `"it should not contain a values"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: ArrayNotContains(t.string, ["a"]),
    });

    expect(
      getErrorMessages(theType.decode({ a: ["a", "b"] }))
    ).toMatchInlineSnapshot(`"a should not contain a values"`);

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: ["a", "b"] } }))
    ).toMatchInlineSnapshot(`"b.a should not contain a values"`);
  });
});
