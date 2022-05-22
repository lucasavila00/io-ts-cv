import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsMacAddress } from "../../src/string/IsMacAddress";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsMacAddress", () => {
  it("works with no config", () => {
    const isAlpha = IsMacAddress();

    expect(E.isRight(isAlpha.decode("00:00:5e:00:53:af"))).toBe(true);
    expect(getErrorMessages(isAlpha.decode("123"))).toMatchInlineSnapshot(
      `"it must be a MAC Address"`
    );
  });
  it("each config is a different brand", () => {
    const codec1 = IsMacAddress(true);
    const codec2 = IsMacAddress(false);

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsMacAddress();

    expect(E.isRight(codec.decode("00:00:5e:00:53:af"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a MAC Address"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsMacAddress(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a MAC Address"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a MAC Address"`);
  });
});
