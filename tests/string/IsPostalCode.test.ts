import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsPostalCode } from "../../src/string/IsPostalCode";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsPostalCode", () => {
  it("each version is a different brand", () => {
    const codec1 = IsPostalCode("BR");
    const codec2 = IsPostalCode("US");

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsPostalCode("BR");

    expect(E.isRight(codec.decode("35170-012"))).toBe(true);
    expect(getErrorMessages(codec.decode("123"))).toMatchInlineSnapshot(
      `"it must be a postal code"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsPostalCode("BR"),
    });

    expect(getErrorMessages(theType.decode({ a: "12" }))).toMatchInlineSnapshot(
      `"a must be a postal code"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "12" } }))
    ).toMatchInlineSnapshot(`"b.a must be a postal code"`);
  });
});
