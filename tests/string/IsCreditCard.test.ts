import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsCreditCard } from "../../src/string/IsCreditCard";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsCreditCard", () => {
  it("works unwrapped", () => {
    const codec = IsCreditCard;

    expect(E.isRight(codec.decode("5555555555554444"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a credit card"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsCreditCard,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a credit card"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a credit card"`);
  });
});
