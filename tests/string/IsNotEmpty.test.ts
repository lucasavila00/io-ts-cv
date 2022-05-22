import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsNotEmpty } from "../../src/string/IsNotEmpty";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsNotEmpty", () => {
  it("works unwrapped", () => {
    const codec = IsNotEmpty;

    expect(E.isRight(codec.decode("a"))).toBe(true);
    expect(getErrorMessages(codec.decode(""))).toMatchInlineSnapshot(
      `"it should not be empty"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsNotEmpty,
    });

    expect(getErrorMessages(theType.decode({ a: "" }))).toMatchInlineSnapshot(
      `"a should not be empty"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "" } }))
    ).toMatchInlineSnapshot(`"b.a should not be empty"`);
  });
});
