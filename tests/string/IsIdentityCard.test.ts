import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsIdentityCard } from "../../string/IsIdentityCard";
import { getMessages as getErrorMessages } from "../utils/validation-messages";

describe("IsIdentityCard", () => {
  it("works with no locale", () => {
    const isIdentityCard = IsIdentityCard("ES");

    expect(E.isRight(isIdentityCard.decode("99999999R"))).toBe(true);
    expect(
      getErrorMessages(isIdentityCard.decode("123"))
    ).toMatchInlineSnapshot(`"it must be a identity card number"`);
  });
  it("each locale is a different brand", () => {
    const codec1 = IsIdentityCard("ES");
    const codec2 = IsIdentityCard("he-IL");

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsIdentityCard("ES");

    expect(E.isRight(codec.decode("99999999R"))).toBe(true);
    expect(getErrorMessages(codec.decode("123"))).toMatchInlineSnapshot(
      `"it must be a identity card number"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsIdentityCard("ES"),
    });

    expect(getErrorMessages(theType.decode({ a: "12" }))).toMatchInlineSnapshot(
      `"a must be a identity card number"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "12" } }))
    ).toMatchInlineSnapshot(`"b.a must be a identity card number"`);
  });
});
