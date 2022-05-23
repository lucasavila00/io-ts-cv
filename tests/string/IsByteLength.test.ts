import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsByteLength } from "../../src/string/IsByteLength";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsByteLength", () => {
  it("works with no max", () => {
    const codec = IsByteLength(1);

    expect(E.isRight(codec.decode("a"))).toBe(true);
    expect(getErrorMessages(codec.decode(""))).toMatchInlineSnapshot(
      `"it's byte length must fall into (1, undefined) range"`
    );
  });
  it("each range is a different brand", () => {
    const codec1 = IsByteLength(0, 1);
    const codec2 = IsByteLength(0, 2);

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsByteLength(3, 4);

    expect(E.isRight(codec.decode("abc"))).toBe(true);
    expect(E.isRight(codec.decode("abcd"))).toBe(true);
    expect(getErrorMessages(codec.decode("ab"))).toMatchInlineSnapshot(
      `"it's byte length must fall into (3, 4) range"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsByteLength(3, 4),
    });

    expect(getErrorMessages(theType.decode({ a: "ab" }))).toMatchInlineSnapshot(
      `"a's byte length must fall into (3, 4) range"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "ab" } }))
    ).toMatchInlineSnapshot(`"b.a's byte length must fall into (3, 4) range"`);
  });
});
