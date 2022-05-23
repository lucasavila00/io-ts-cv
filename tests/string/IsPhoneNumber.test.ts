import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsPhoneNumber } from "../../src/string/IsPhoneNumber";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsPhoneNumber", () => {
  it("works with no config", () => {
    const isAlpha = IsPhoneNumber();

    expect(E.isRight(isAlpha.decode("+553112341234"))).toBe(true);
    expect(getErrorMessages(isAlpha.decode("123"))).toMatchInlineSnapshot(
      `"it must be a valid phone number"`
    );
  });

  it("each locale is a different brand", () => {
    const codec1 = IsPhoneNumber("US");
    const codec2 = IsPhoneNumber("BR");

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsPhoneNumber("BR");

    expect(E.isRight(codec.decode("+553112341234"))).toBe(true);
    expect(getErrorMessages(codec.decode("123"))).toMatchInlineSnapshot(
      `"it must be a valid phone number"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsPhoneNumber("BR"),
    });

    expect(getErrorMessages(theType.decode({ a: "12" }))).toMatchInlineSnapshot(
      `"a must be a valid phone number"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "12" } }))
    ).toMatchInlineSnapshot(`"b.a must be a valid phone number"`);
  });
});
