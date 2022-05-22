import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsAlphanumeric } from "../../src/string/IsAlphanumeric";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsAlpha", () => {
  it("works with no locale", () => {
    const isAlpha = IsAlphanumeric();

    expect(E.isRight(isAlpha.decode("abc123"))).toBe(true);
    expect(getErrorMessages(isAlpha.decode("_a_"))).toMatchInlineSnapshot(
      `"it must contain only letters and numbers"`
    );
  });
  it("each locale is a different brand", () => {
    const codec1 = IsAlphanumeric("en-US");
    const codec2 = IsAlphanumeric("pt-BR");

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsAlphanumeric("en-US");

    expect(E.isRight(codec.decode("abc123"))).toBe(true);
    expect(getErrorMessages(codec.decode("_a_"))).toMatchInlineSnapshot(
      `"it must contain only letters and numbers"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsAlphanumeric("en-US"),
    });

    expect(
      getErrorMessages(theType.decode({ a: "_a_" }))
    ).toMatchInlineSnapshot(`"a must contain only letters and numbers"`);

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "_a_" } }))
    ).toMatchInlineSnapshot(`"b.a must contain only letters and numbers"`);
  });
});
