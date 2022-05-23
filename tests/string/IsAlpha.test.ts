import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsAlpha } from "../../src/string/IsAlpha";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsAlpha", () => {
  it("works with no locale", () => {
    const isAlpha = IsAlpha();

    expect(E.isRight(isAlpha.decode("abc"))).toBe(true);
    expect(getErrorMessages(isAlpha.decode("123"))).toMatchInlineSnapshot(
      `"it must contain only letters (a-zA-Z)"`
    );
  });
  it("each locale is a different brand", () => {
    const codec1 = IsAlpha("en-US");
    const codec2 = IsAlpha("pt-BR");

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsAlpha("en-US");

    expect(E.isRight(codec.decode("abc"))).toBe(true);
    expect(getErrorMessages(codec.decode("123"))).toMatchInlineSnapshot(
      `"it must contain only letters (a-zA-Z)"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsAlpha("en-US"),
    });

    expect(getErrorMessages(theType.decode({ a: "12" }))).toMatchInlineSnapshot(
      `"a must contain only letters (a-zA-Z)"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "12" } }))
    ).toMatchInlineSnapshot(`"b.a must contain only letters (a-zA-Z)"`);
  });
});
