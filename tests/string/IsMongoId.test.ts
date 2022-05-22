import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsMongoId } from "../../src/string/IsMongoId";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsMongoId", () => {
  it("works unwrapped", () => {
    const codec = IsMongoId;

    expect(E.isRight(codec.decode("507f191e810c19729de860ea"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be a mongodb id"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsMongoId,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be a mongodb id"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be a mongodb id"`);
  });
});
