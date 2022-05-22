import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsISSN } from "../../string/IsISSN";
import { getMessages as getErrorMessages } from "../utils/validation-messages";

describe("IsISSN", () => {
  it("works unwrapped", () => {
    const codec = IsISSN();

    expect(E.isRight(codec.decode("1748-7188"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(`"it must be a ISSN"`);
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsISSN(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a ISSN"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a ISSN"`);
  });
});
