import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsRFC3339 } from "../../string/IsRFC3339";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsRFC3339", () => {
  it("works unwrapped", () => {
    const codec = IsRFC3339;

    expect(E.isRight(codec.decode("2002-10-02T10:00:00-05:00"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be RFC 3339 date"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsRFC3339,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be RFC 3339 date"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be RFC 3339 date"`);
  });
});
