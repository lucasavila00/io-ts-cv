import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { Equals } from "../../src/common/Equals";
import { getErrorMessages } from "../utils/validation-messages";

describe("Equals", () => {
  it("each config is a different brand", () => {
    const codec1 = Equals(2);
    const codec2 = Equals(3);

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = Equals(3);

    expect(E.isRight(codec.decode(3))).toBe(true);
    expect(getErrorMessages(codec.decode(4))).toMatchInlineSnapshot(
      `"it must be equal to 3"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: Equals(3),
    });

    expect(getErrorMessages(theType.decode({ a: 4 }))).toMatchInlineSnapshot(
      `"a must be equal to 3"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: 4 } }))
    ).toMatchInlineSnapshot(`"b.a must be equal to 3"`);
  });
});
