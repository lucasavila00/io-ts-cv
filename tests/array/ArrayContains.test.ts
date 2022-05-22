import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { ArrayContains } from "../../src/array/ArrayContains";
import { getErrorMessages } from "../utils/validation-messages";

describe("ArrayContains", () => {
  it("works unwrapped", () => {
    const codec = ArrayContains(t.string, ["a"]);

    expect(E.isRight(codec.decode(["a", "b"]))).toBe(true);
    expect(getErrorMessages(codec.decode(["b"]))).toMatchInlineSnapshot(
      `"it must contain a values"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: ArrayContains(t.string, ["a"]),
    });

    expect(
      getErrorMessages(theType.decode({ a: ["b"] }))
    ).toMatchInlineSnapshot(`"a must contain a values"`);

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: ["b"] } }))
    ).toMatchInlineSnapshot(`"b.a must contain a values"`);
  });
});
