import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsVariableWidth } from "../../string/IsVariableWidth";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsVariableWidth", () => {
  it("works unwrapped", () => {
    const codec = IsVariableWidth;

    expect(E.isRight(codec.decode("￠｣"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must contain a full-width and half-width characters"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsVariableWidth,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must contain a full-width and half-width characters"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(
      `"b.a must contain a full-width and half-width characters"`
    );
  });
});
