import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { Length } from "../../string/Length";
import { getErrorMessages } from "../utils/validation-messages";

describe("Length", () => {
  it("works with no max", () => {
    const codec = Length(1);

    expect(E.isRight(codec.decode("a"))).toBe(true);
    expect(getErrorMessages(codec.decode(""))).toMatchInlineSnapshot(
      `"it must be longer than or equal to 1 and shorter than or equal to undefined characters"`
    );
  });
  it("each range is a different brand", () => {
    const codec1 = Length(0, 1);
    const codec2 = Length(0, 2);

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = Length(3, 4);

    expect(E.isRight(codec.decode("abc"))).toBe(true);
    expect(E.isRight(codec.decode("abcd"))).toBe(true);
    expect(getErrorMessages(codec.decode("ab"))).toMatchInlineSnapshot(
      `"it must be longer than or equal to 3 and shorter than or equal to 4 characters"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: Length(3, 4),
    });

    expect(getErrorMessages(theType.decode({ a: "ab" }))).toMatchInlineSnapshot(
      `"a must be longer than or equal to 3 and shorter than or equal to 4 characters"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "ab" } }))
    ).toMatchInlineSnapshot(
      `"b.a must be longer than or equal to 3 and shorter than or equal to 4 characters"`
    );
  });
});
