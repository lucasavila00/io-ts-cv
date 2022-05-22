import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsIBAN } from "../../string/IsIBAN";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsIBAN", () => {
  it("works unwrapped", () => {
    const codec = IsIBAN;

    expect(E.isRight(codec.decode("BE71 0961 2345 6769"))).toBe(true);
    expect(getErrorMessages(codec.decode("￠"))).toMatchInlineSnapshot(
      `"it must be an IBAN"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsIBAN,
    });

    expect(getErrorMessages(theType.decode({ a: "￠" }))).toMatchInlineSnapshot(
      `"a must be an IBAN"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "￠" } }))
    ).toMatchInlineSnapshot(`"b.a must be an IBAN"`);
  });
});
