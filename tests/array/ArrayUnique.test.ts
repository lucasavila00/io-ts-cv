import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { ArrayUnique } from "../../src/array/ArrayUnique";
import { getErrorMessages } from "../utils/validation-messages";

describe("ArrayUnique", () => {
  it("works unwrapped", () => {
    const codec = ArrayUnique(t.string);

    expect(E.isRight(codec.decode(["a", "b"]))).toBe(true);
    expect(getErrorMessages(codec.decode(["b", "b"]))).toMatchInlineSnapshot(
      `"All it's elements must be unique"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: ArrayUnique(t.string),
    });

    expect(
      getErrorMessages(theType.decode({ a: ["b", "b"] }))
    ).toMatchInlineSnapshot(`"All a's elements must be unique"`);

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: ["b", "b"] } }))
    ).toMatchInlineSnapshot(`"All b.a's elements must be unique"`);
  });
});
