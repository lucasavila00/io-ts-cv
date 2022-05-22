import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsDecimal } from "../../string/IsDecimal";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsDecimal", () => {
  it("works unwrapped", () => {
    const codec = IsDecimal();

    expect(E.isRight(codec.decode("1.00"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it is not a valid decimal number."`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsDecimal(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a is not a valid decimal number."`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a is not a valid decimal number."`);
  });
});
