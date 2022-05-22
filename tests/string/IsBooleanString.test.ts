import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsBooleanString } from "../../src/string/IsBooleanString";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsBooleanString", () => {
  it("works unwrapped", () => {
    const codec = IsBooleanString;

    expect(E.isRight(codec.decode("true"))).toBe(true);
    expect(E.isRight(codec.decode("false"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a boolean string"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsBooleanString,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a boolean string"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a boolean string"`);
  });
});
