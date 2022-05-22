import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsLocale } from "../../string/IsLocale";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsLocale", () => {
  it("works unwrapped", () => {
    const codec = IsLocale;

    expect(E.isRight(codec.decode("pt-BR"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be locale"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsLocale,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be locale"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be locale"`);
  });
});
