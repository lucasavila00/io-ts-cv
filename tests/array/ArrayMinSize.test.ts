import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { ArrayMinSize } from "../../src/array/ArrayMinSize";
import { getErrorMessages } from "../utils/validation-messages";

describe("ArrayMinSize", () => {
  it("each config is a different brand", () => {
    const codec1 = ArrayMinSize(t.string, 2);
    const codec2 = ArrayMinSize(t.string, 3);

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = ArrayMinSize(t.string, 3);

    expect(E.isRight(codec.decode(["1", "2", "3", "4"]))).toBe(true);
    expect(E.isRight(codec.decode(["1", "2", "3"]))).toBe(true);
    expect(getErrorMessages(codec.decode(["1"]))).toMatchInlineSnapshot(
      `"it must contain at least 3 elements"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: ArrayMinSize(t.string, 3),
    });

    expect(
      getErrorMessages(theType.decode({ a: ["1"] }))
    ).toMatchInlineSnapshot(`"a must contain at least 3 elements"`);

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: ["1"] } }))
    ).toMatchInlineSnapshot(`"b.a must contain at least 3 elements"`);
  });
});
