import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsSurrogatePair } from "../../string/IsSurrogatePair";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsSurrogatePair", () => {
  it("works unwrapped", () => {
    const codec = IsSurrogatePair;

    expect(E.isRight(codec.decode("𐀀"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must contain any surrogate pairs chars"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsSurrogatePair,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must contain any surrogate pairs chars"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must contain any surrogate pairs chars"`);
  });
});
