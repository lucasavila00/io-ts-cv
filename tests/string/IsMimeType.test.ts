import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsMimeType } from "../../src/string/IsMimeType";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsMimeType", () => {
  it("works unwrapped", () => {
    const codec = IsMimeType;

    expect(E.isRight(codec.decode("application/octet-stream"))).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be MIME type format"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsMimeType,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be MIME type format"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be MIME type format"`);
  });
});
