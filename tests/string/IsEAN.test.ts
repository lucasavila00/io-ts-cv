import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsEAN } from "../../string/IsEAN";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsEAN", () => {
  it("works unwrapped", () => {
    const codec = IsEAN;

    expect(E.isRight(codec.decode("4070071967072"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be an EAN (European Article Number)"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsEAN,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be an EAN (European Article Number)"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be an EAN (European Article Number)"`);
  });
});
