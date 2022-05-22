import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsISRC } from "../../src/string/IsISRC";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsISRC", () => {
  it("works unwrapped", () => {
    const codec = IsISRC;

    expect(E.isRight(codec.decode("AA6Q72000047"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be an ISRC"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsISRC,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be an ISRC"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be an ISRC"`);
  });
});
