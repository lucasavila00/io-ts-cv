import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsHexColor } from "../../src/string/IsHexColor";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsHexColor", () => {
  it("works unwrapped", () => {
    const codec = IsHexColor;

    expect(E.isRight(codec.decode("#ff0000"))).toBe(true);
    expect(getErrorMessages(codec.decode("￠"))).toMatchInlineSnapshot(
      `"it must be a hexadecimal color"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsHexColor,
    });

    expect(getErrorMessages(theType.decode({ a: "￠" }))).toMatchInlineSnapshot(
      `"a must be a hexadecimal color"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "￠" } }))
    ).toMatchInlineSnapshot(`"b.a must be a hexadecimal color"`);
  });
});
