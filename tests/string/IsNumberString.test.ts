import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsNumberString } from "../../src/string/IsNumberString";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsNumberString", () => {
  it("works with no config", () => {
    const isAlpha = IsNumberString();

    expect(E.isRight(isAlpha.decode("123"))).toBe(true);
    expect(getErrorMessages(isAlpha.decode("abc"))).toMatchInlineSnapshot(
      `"it must be a number string"`
    );
  });
  it("each config is a different brand", () => {
    const codec1 = IsNumberString(true);
    const codec2 = IsNumberString(false);

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsNumberString();

    expect(E.isRight(codec.decode("123"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a number string"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsNumberString(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a number string"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a number string"`);
  });
});
