import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsEmpty } from "../../src/string/IsEmpty";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsEmpty", () => {
  it("works unwrapped", () => {
    const codec = IsEmpty;

    expect(E.isRight(codec.decode(""))).toBe(true);
    expect(getErrorMessages(codec.decode("à"))).toMatchInlineSnapshot(
      `"it must be empty"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsEmpty,
    });

    expect(getErrorMessages(theType.decode({ a: "à" }))).toMatchInlineSnapshot(
      `"a must be empty"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "à" } }))
    ).toMatchInlineSnapshot(`"b.a must be empty"`);
  });
});
