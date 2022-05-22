import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { Max } from "../../src/number/Max";
import { getErrorMessages } from "../utils/validation-messages";

describe("Max", () => {
  it("each config is a different brand", () => {
    const codec1 = Max(1);
    const codec2 = Max(2);

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = Max(2);

    expect(E.isRight(codec.decode(2))).toBe(true);
    expect(getErrorMessages(codec.decode(3))).toMatchInlineSnapshot(
      `"it must not be greater than 2"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: Max(2),
    });

    expect(getErrorMessages(theType.decode({ a: 3 }))).toMatchInlineSnapshot(
      `"a must not be greater than 2"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: 3 } }))
    ).toMatchInlineSnapshot(`"b.a must not be greater than 2"`);
  });
});
