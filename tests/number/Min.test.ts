import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { Min } from "../../src/number/Min";
import { getErrorMessages } from "../utils/validation-messages";

describe("Min", () => {
  it("each config is a different brand", () => {
    const codec1 = Min(1);
    const codec2 = Min(2);

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = Min(2);

    expect(E.isRight(codec.decode(3))).toBe(true);
    expect(getErrorMessages(codec.decode(1))).toMatchInlineSnapshot(
      `"it must not be less than 2"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: Min(2),
    });

    expect(getErrorMessages(theType.decode({ a: 1 }))).toMatchInlineSnapshot(
      `"a must not be less than 2"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: 1 } }))
    ).toMatchInlineSnapshot(`"b.a must not be less than 2"`);
  });
});
