import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsIn } from "../../src/common/IsIn";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsIn", () => {
  it("works unwrapped", () => {
    const codec = IsIn(t.string, ["a"]);

    expect(E.isRight(codec.decode("a"))).toBe(true);
    expect(getErrorMessages(codec.decode("b"))).toMatchInlineSnapshot(
      `"it must be one of the following values: a"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsIn(t.string, ["a"]),
    });

    expect(getErrorMessages(theType.decode({ a: "b" }))).toMatchInlineSnapshot(
      `"a must be one of the following values: a"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "b" } }))
    ).toMatchInlineSnapshot(`"b.a must be one of the following values: a"`);
  });
});
