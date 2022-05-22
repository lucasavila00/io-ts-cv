import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsCurrency } from "../../string/IsCurrency";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsCurrency", () => {
  it("works unwrapped", () => {
    const codec = IsCurrency();

    expect(E.isRight(codec.decode("$1"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a currency"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsCurrency(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a currency"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a currency"`);
  });
});
