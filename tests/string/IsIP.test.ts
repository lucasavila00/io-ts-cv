import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsIP } from "../../src/string/IsIP";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsIP", () => {
  it("each version is a different brand", () => {
    const codec1 = IsIP("4");
    const codec2 = IsIP("6");

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsIP("4");

    expect(E.isRight(codec.decode("0.0.0.0"))).toBe(true);
    expect(getErrorMessages(codec.decode("123"))).toMatchInlineSnapshot(
      `"it must be an ip address"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsIP("4"),
    });

    expect(getErrorMessages(theType.decode({ a: "12" }))).toMatchInlineSnapshot(
      `"a must be an ip address"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "12" } }))
    ).toMatchInlineSnapshot(`"b.a must be an ip address"`);
  });
});
