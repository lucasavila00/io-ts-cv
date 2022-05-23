import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsDivisibleBy } from "../../src/number/IsDivisibleBy";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsDivisibleBy", () => {
  it("each config is a different brand", () => {
    const codec1 = IsDivisibleBy(1);
    const codec2 = IsDivisibleBy(2);

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsDivisibleBy(2);

    expect(E.isRight(codec.decode(2))).toBe(true);
    expect(getErrorMessages(codec.decode(1))).toMatchInlineSnapshot(
      `"it must be divisible by 2"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsDivisibleBy(2),
    });

    expect(getErrorMessages(theType.decode({ a: 1 }))).toMatchInlineSnapshot(
      `"a must be divisible by 2"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: 1 } }))
    ).toMatchInlineSnapshot(`"b.a must be divisible by 2"`);
  });
});
