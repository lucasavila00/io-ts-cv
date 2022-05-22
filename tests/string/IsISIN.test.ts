import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsISIN } from "../../string/IsISIN";
import { getMessages as getErrorMessages } from "../utils/validation-messages";

describe("IsISIN", () => {
  it("works unwrapped", () => {
    const codec = IsISIN;

    expect(E.isRight(codec.decode("BRSMAL9F00T9"))).toBe(true);
    expect(getErrorMessages(codec.decode("￠"))).toMatchInlineSnapshot(
      `"it must be an ISIN (stock/security identifier)"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsISIN,
    });

    expect(getErrorMessages(theType.decode({ a: "￠" }))).toMatchInlineSnapshot(
      `"a must be an ISIN (stock/security identifier)"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "￠" } }))
    ).toMatchInlineSnapshot(
      `"b.a must be an ISIN (stock/security identifier)"`
    );
  });
});
