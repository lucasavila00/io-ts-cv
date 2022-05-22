import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsDateString } from "../../src/string/IsDateString";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsDateString", () => {
  it("works with no config", () => {
    const isAlpha = IsDateString();

    expect(E.isRight(isAlpha.decode("2022-05-22T13:51:41.478Z"))).toBe(true);
    expect(getErrorMessages(isAlpha.decode("123"))).toMatchInlineSnapshot(
      `"it must be a valid ISO 8601 date string"`
    );
  });
  it("each config is a different brand", () => {
    const codec1 = IsDateString(true);
    const codec2 = IsDateString(false);

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsDateString();

    expect(E.isRight(codec.decode("2022-05-22T13:51:41.478Z"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a valid ISO 8601 date string"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsDateString(),
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a valid ISO 8601 date string"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a valid ISO 8601 date string"`);
  });
});
