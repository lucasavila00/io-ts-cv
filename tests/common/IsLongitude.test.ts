import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsLongitude } from "../../src/common/IsLongitude";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsLongitude", () => {
  it("works with strings", () => {
    const codec = IsLongitude(t.string);

    expect(E.isRight(codec.decode("45"))).toBe(true);
  });
  it("works with numbers", () => {
    const codec = IsLongitude(t.number);

    expect(E.isRight(codec.decode(45))).toBe(true);
    expect(E.isRight(codec.decode(-450))).toBe(false);
  });

  it("works unwrapped", () => {
    const codec = IsLongitude(t.string);

    expect(getErrorMessages(codec.decode("b"))).toMatchInlineSnapshot(
      `"it must be a longitude string or number"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsLongitude(t.string),
    });

    expect(getErrorMessages(theType.decode({ a: "b" }))).toMatchInlineSnapshot(
      `"a must be a longitude string or number"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "b" } }))
    ).toMatchInlineSnapshot(`"b.a must be a longitude string or number"`);
  });
});
