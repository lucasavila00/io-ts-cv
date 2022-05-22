import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { ArrayNotEmpty } from "../../src/array/ArrayNotEmpty";
import { getErrorMessages } from "../utils/validation-messages";

describe("ArrayNotEmpty", () => {
  it("works unwrapped", () => {
    const ArrayNotEmpty3 = ArrayNotEmpty(t.string);

    expect(E.isRight(ArrayNotEmpty3.decode(["1", "2", "3"]))).toBe(true);
    expect(getErrorMessages(ArrayNotEmpty3.decode([]))).toMatchInlineSnapshot(
      `"it should not be emtpty"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: ArrayNotEmpty(t.string),
    });

    expect(getErrorMessages(theType.decode({ a: [] }))).toMatchInlineSnapshot(
      `"a should not be emtpty"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: [] } }))
    ).toMatchInlineSnapshot(`"b.a should not be emtpty"`);
  });
});
