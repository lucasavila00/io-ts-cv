import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsMobilePhone } from "../../src/string/IsMobilePhone";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsMobilePhone", () => {
  it("works unwrapped", () => {
    const codec = IsMobilePhone("pt-BR");

    expect(E.isRight(codec.decode("+553112341234"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a phone number"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsMobilePhone(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a phone number"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a phone number"`);
  });
});
