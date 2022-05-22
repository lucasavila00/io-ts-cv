import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsBIC } from "../../string/IsBIC";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsBIC", () => {
  it("works unwrapped", () => {
    const codec = IsBIC;

    expect(E.isRight(codec.decode("CHASUS33"))).toBe(true);
    expect(getErrorMessages(codec.decode("à"))).toMatchInlineSnapshot(
      `"it must be a BIC or SWIFT code"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsBIC,
    });

    expect(getErrorMessages(theType.decode({ a: "à" }))).toMatchInlineSnapshot(
      `"a must be a BIC or SWIFT code"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "à" } }))
    ).toMatchInlineSnapshot(`"b.a must be a BIC or SWIFT code"`);
  });
});
