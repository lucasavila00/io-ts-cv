import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { NotEquals } from "../../src/common/NotEquals";
import { getErrorMessages } from "../utils/validation-messages";

describe("NotEquals", () => {
  it("each config is a different brand", () => {
    const codec1 = NotEquals(t.number, 2);
    const codec2 = NotEquals(t.number, 3);

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = NotEquals(t.number, 3);

    expect(E.isRight(codec.decode(4))).toBe(true);
    expect(getErrorMessages(codec.decode(3))).toMatchInlineSnapshot(
      `"it should not be equal to 3"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: NotEquals(t.number, 3),
    });

    expect(getErrorMessages(theType.decode({ a: 3 }))).toMatchInlineSnapshot(
      `"a should not be equal to 3"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: 3 } }))
    ).toMatchInlineSnapshot(`"b.a should not be equal to 3"`);
  });
});
