import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsISBN } from "../../string/IsISBN";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsISBN", () => {
  it("each version is a different brand", () => {
    const codec1 = IsISBN("10");
    const codec2 = IsISBN("13");

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsISBN("10");

    expect(E.isRight(codec.decode("0-19-853453-1"))).toBe(true);
    expect(getErrorMessages(codec.decode("123"))).toMatchInlineSnapshot(
      `"it must be an ISBN"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsISBN("10"),
    });

    expect(getErrorMessages(theType.decode({ a: "12" }))).toMatchInlineSnapshot(
      `"a must be an ISBN"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "12" } }))
    ).toMatchInlineSnapshot(`"b.a must be an ISBN"`);
  });
});
