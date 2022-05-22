import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsLatitude } from "../../src/common/IsLatitude";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsLatitude", () => {
  it("works with strings", () => {
    const codec = IsLatitude(t.string);

    expect(E.isRight(codec.decode("45"))).toBe(true);
  });
  it("works with numbers", () => {
    const codec = IsLatitude(t.number);

    expect(E.isRight(codec.decode(45))).toBe(true);
  });

  it("works unwrapped", () => {
    const codec = IsLatitude(t.string);

    expect(getErrorMessages(codec.decode("b"))).toMatchInlineSnapshot(
      `"it must be a latitude string or number"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsLatitude(t.string),
    });

    expect(getErrorMessages(theType.decode({ a: "b" }))).toMatchInlineSnapshot(
      `"a must be a latitude string or number"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "b" } }))
    ).toMatchInlineSnapshot(`"b.a must be a latitude string or number"`);
  });
});
