import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { Contains } from "../../string/Contains";
import { getErrorMessages } from "../utils/validation-messages";

describe("Contains", () => {
  it("each seed is a different brand", () => {
    const codec1 = Contains("a");
    const codec2 = Contains("b");

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = Contains("abc");

    expect(E.isRight(codec.decode("abc"))).toBe(true);
    expect(E.isRight(codec.decode("abcd"))).toBe(true);
    expect(getErrorMessages(codec.decode("ab"))).toMatchInlineSnapshot(
      `"it must contain a abc string"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: Contains("abc"),
    });

    expect(getErrorMessages(theType.decode({ a: "ab" }))).toMatchInlineSnapshot(
      `"a must contain a abc string"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "ab" } }))
    ).toMatchInlineSnapshot(`"b.a must contain a abc string"`);
  });
});
