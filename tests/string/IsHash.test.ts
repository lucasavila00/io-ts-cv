import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsHash } from "../../src/string/IsHash";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsHash", () => {
  it("each locale is a different brand", () => {
    const codec1 = IsHash("md5");
    const codec2 = IsHash("sha256");

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsHash("md5");

    expect(E.isRight(codec.decode("900150983cd24fb0d6963f7d28e17f72"))).toBe(
      true
    );
    expect(getErrorMessages(codec.decode("123"))).toMatchInlineSnapshot(
      `"it must be a hash of type md5"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsHash("md5"),
    });

    expect(getErrorMessages(theType.decode({ a: "12" }))).toMatchInlineSnapshot(
      `"a must be a hash of type md5"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "12" } }))
    ).toMatchInlineSnapshot(`"b.a must be a hash of type md5"`);
  });
});
