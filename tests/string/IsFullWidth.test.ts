import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsFullWidth } from "../../string/IsFullWidth";
import { getMessages as getErrorMessages } from "../utils/validation-messages";

describe("IsFullWidth", () => {
  it("works unwrapped", () => {
    const codec = IsFullWidth;

    expect(E.isRight(codec.decode("￠"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must contain any full-width characters"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsFullWidth,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must contain any full-width characters"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must contain any full-width characters"`);
  });
});
