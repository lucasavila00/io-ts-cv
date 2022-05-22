import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { MinLength } from "../../src/string/MinLength";
import { getErrorMessages } from "../utils/validation-messages";

describe("MinLength", () => {
  it("each length is a different brand", () => {
    const MinLength3 = MinLength(3);
    const MinLength2 = MinLength(2);

    let a: t.TypeOf<typeof MinLength3>;
    let b: t.TypeOf<typeof MinLength2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const MinLength3 = MinLength(3);

    expect(E.isRight(MinLength3.decode("123"))).toBe(true);
    expect(E.isRight(MinLength3.decode("1234"))).toBe(true);
    expect(getErrorMessages(MinLength3.decode("12"))).toMatchInlineSnapshot(
      `"it must be longer than or equal to 3 characters"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: MinLength(3),
    });

    expect(getErrorMessages(theType.decode({ a: "12" }))).toMatchInlineSnapshot(
      `"a must be longer than or equal to 3 characters"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "12" } }))
    ).toMatchInlineSnapshot(
      `"b.a must be longer than or equal to 3 characters"`
    );
  });
});
