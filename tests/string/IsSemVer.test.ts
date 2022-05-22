import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsSemVer } from "../../src/string/IsSemVer";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsSemVer", () => {
  it("works unwrapped", () => {
    const codec = IsSemVer;

    expect(E.isRight(codec.decode("1.0.0"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be a Semantic Versioning Specification"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsSemVer,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be a Semantic Versioning Specification"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(
      `"b.a must be a Semantic Versioning Specification"`
    );
  });
});
