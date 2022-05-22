import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsPort } from "../../src/string/IsPort";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsPort", () => {
  it("works unwrapped", () => {
    const codec = IsPort;

    expect(E.isRight(codec.decode("8123"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be a port"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsPort,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be a port"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be a port"`);
  });
});
