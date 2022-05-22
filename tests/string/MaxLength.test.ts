import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { MaxLength } from "../../string/MaxLength";
import { getErrorMessages } from "../utils/validation-messages";

describe("MaxLength", () => {
  it("each length is a different brand", () => {
    const maxLength3 = MaxLength(3);
    const maxLength2 = MaxLength(2);

    let a: t.TypeOf<typeof maxLength3>;
    let b: t.TypeOf<typeof maxLength2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const maxLength3 = MaxLength(3);

    expect(E.isRight(maxLength3.decode("123"))).toBe(true);
    expect(E.isRight(maxLength3.decode("12"))).toBe(true);
    expect(getErrorMessages(maxLength3.decode("1234"))).toMatchInlineSnapshot(
      `"it must be shorter than or equal to 3 characters"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: MaxLength(3),
    });

    expect(
      getErrorMessages(theType.decode({ a: "1234" }))
    ).toMatchInlineSnapshot(
      `"a must be shorter than or equal to 3 characters"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "1234" } }))
    ).toMatchInlineSnapshot(
      `"b.a must be shorter than or equal to 3 characters"`
    );
  });
});
