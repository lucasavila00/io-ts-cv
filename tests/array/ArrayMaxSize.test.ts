import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { ArrayMaxSize } from "../../src/array/ArrayMaxSize";
import { getErrorMessages } from "../utils/validation-messages";

describe("ArrayMaxSize", () => {
  it("each config is a different brand", () => {
    const codec1 = ArrayMaxSize(t.string, 2);
    const codec2 = ArrayMaxSize(t.string, 3);

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = ArrayMaxSize(t.string, 3);

    expect(E.isRight(codec.decode(["123"]))).toBe(true);
    expect(E.isRight(codec.decode(["1", "2", "3"]))).toBe(true);
    expect(
      getErrorMessages(codec.decode(["1", "2", "3", "4"]))
    ).toMatchInlineSnapshot(`"it must contain not more than 3 elements"`);
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: ArrayMaxSize(t.string, 3),
    });

    expect(
      getErrorMessages(theType.decode({ a: ["1", "2", "3", "4"] }))
    ).toMatchInlineSnapshot(`"a must contain not more than 3 elements"`);

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: ["1", "2", "3", "4"] } }))
    ).toMatchInlineSnapshot(`"b.a must contain not more than 3 elements"`);
  });
});
