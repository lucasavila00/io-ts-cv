import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsLatLong } from "../../src/string/IsLatLong";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsLatLong", () => {
  it("works unwrapped", () => {
    const codec = IsLatLong;

    expect(E.isRight(codec.decode("45,45"))).toBe(true);
    expect(getErrorMessages(codec.decode("à"))).toMatchInlineSnapshot(
      `"it must be a latitude,longitude string"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsLatLong,
    });

    expect(getErrorMessages(theType.decode({ a: "à" }))).toMatchInlineSnapshot(
      `"a must be a latitude,longitude string"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "à" } }))
    ).toMatchInlineSnapshot(`"b.a must be a latitude,longitude string"`);
  });
});
