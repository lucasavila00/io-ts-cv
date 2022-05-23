import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsRgbColor } from "../../src/string/IsRgbColor";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsRgbColor", () => {
  it("works with no config", () => {
    const isAlpha = IsRgbColor();

    expect(E.isRight(isAlpha.decode("rgb(0,0,0)"))).toBe(true);
    expect(getErrorMessages(isAlpha.decode("123"))).toMatchInlineSnapshot(
      `"it must be RGB color"`
    );
  });
  it("each config is a different brand", () => {
    const codec1 = IsRgbColor(true);
    const codec2 = IsRgbColor(false);

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsRgbColor();

    expect(E.isRight(codec.decode("rgb(0,0,0)"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be RGB color"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsRgbColor(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be RGB color"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be RGB color"`);
  });
});
