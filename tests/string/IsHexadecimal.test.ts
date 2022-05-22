import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsHexadecimal } from "../../src/string/IsHexadecimal";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsHexadecimal", () => {
  it("works unwrapped", () => {
    const codec = IsHexadecimal;

    expect(E.isRight(codec.decode("ff0000"))).toBe(true);
    expect(getErrorMessages(codec.decode("￠"))).toMatchInlineSnapshot(
      `"it must be a hexadecimal number"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsHexadecimal,
    });

    expect(getErrorMessages(theType.decode({ a: "￠" }))).toMatchInlineSnapshot(
      `"a must be a hexadecimal number"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "￠" } }))
    ).toMatchInlineSnapshot(`"b.a must be a hexadecimal number"`);
  });
});
