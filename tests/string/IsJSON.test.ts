import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsJSON } from "../../string/IsJSON";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsJSON", () => {
  it("works unwrapped", () => {
    const codec = IsJSON;

    expect(E.isRight(codec.decode(`{"a":1}`))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be a json string"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsJSON,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be a json string"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be a json string"`);
  });
});
