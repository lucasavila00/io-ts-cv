import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { NotContains } from "../../string/NotContains";
import { getErrorMessages } from "../utils/validation-messages";

describe("NotContains", () => {
  it("each seed is a different brand", () => {
    const codec1 = NotContains("a");
    const codec2 = NotContains("b");

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = NotContains("e");

    expect(E.isRight(codec.decode("abc"))).toBe(true);
    expect(getErrorMessages(codec.decode("e"))).toMatchInlineSnapshot(
      `"it must not contain a e string"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: NotContains("e"),
    });

    expect(getErrorMessages(theType.decode({ a: "e" }))).toMatchInlineSnapshot(
      `"a must not contain a e string"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "e" } }))
    ).toMatchInlineSnapshot(`"b.a must not contain a e string"`);
  });
});
