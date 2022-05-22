import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsBtcAddress } from "../../string/IsBtcAddress";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsBtcAddress", () => {
  it("works unwrapped", () => {
    const codec = IsBtcAddress;

    expect(
      E.isRight(codec.decode("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"))
    ).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a BTC address"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsBtcAddress,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a BTC address"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a BTC address"`);
  });
});
