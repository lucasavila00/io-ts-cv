import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsNotIn } from "../../src/common/IsNotIn";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsNotIn", () => {
  it("works unwrapped", () => {
    const codec = IsNotIn(t.string, ["a", "c"]);

    expect(E.isRight(codec.decode("b"))).toBe(true);
    expect(getErrorMessages(codec.decode("a"))).toMatchInlineSnapshot(
      `"it should not be one of the following values: a,c"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsNotIn(t.string, ["a", "c"]),
    });

    expect(getErrorMessages(theType.decode({ a: "a" }))).toMatchInlineSnapshot(
      `"a should not be one of the following values: a,c"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "a" } }))
    ).toMatchInlineSnapshot(
      `"b.a should not be one of the following values: a,c"`
    );
  });
});
