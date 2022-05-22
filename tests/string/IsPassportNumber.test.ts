import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsPassportNumber } from "../../src/string/IsPassportNumber";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsPassportNumber", () => {
  it("each locale is a different brand", () => {
    const codec1 = IsPassportNumber("US");
    const codec2 = IsPassportNumber("BR");

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsPassportNumber("US");

    expect(E.isRight(codec.decode("131195855"))).toBe(true);
    expect(getErrorMessages(codec.decode("123"))).toMatchInlineSnapshot(
      `"it must be valid passport number"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsPassportNumber("US"),
    });

    expect(getErrorMessages(theType.decode({ a: "12" }))).toMatchInlineSnapshot(
      `"a must be valid passport number"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "12" } }))
    ).toMatchInlineSnapshot(`"b.a must be valid passport number"`);
  });
});
