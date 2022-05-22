import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsISO31661Alpha2 } from "../../string/IsISO31661Alpha2";
import { getMessages as getErrorMessages } from "../utils/validation-messages";

describe("IsISO31661Alpha2", () => {
  it("works unwrapped", () => {
    const codec = IsISO31661Alpha2;

    expect(E.isRight(codec.decode("BR"))).toBe(true);
    expect(getErrorMessages(codec.decode("￠"))).toMatchInlineSnapshot(
      `"it must be a valid ISO31661 Alpha2 code"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsISO31661Alpha2,
    });

    expect(getErrorMessages(theType.decode({ a: "￠" }))).toMatchInlineSnapshot(
      `"a must be a valid ISO31661 Alpha2 code"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "￠" } }))
    ).toMatchInlineSnapshot(`"b.a must be a valid ISO31661 Alpha2 code"`);
  });
});
