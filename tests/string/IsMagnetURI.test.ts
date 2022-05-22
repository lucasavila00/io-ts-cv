import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsMagnetURI } from "../../string/IsMagnetURI";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsMagnetURI", () => {
  it("works unwrapped", () => {
    const codec = IsMagnetURI;

    expect(
      E.isRight(
        codec.decode("magnet:?xt=urn:sha1:YNCKHTQCWBTRNJIV4WNAE52SJUQCZO5C")
      )
    ).toBe(true);
    expect(getErrorMessages(codec.decode("A"))).toMatchInlineSnapshot(
      `"it must be magnet uri format"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsMagnetURI,
    });

    expect(getErrorMessages(theType.decode({ a: "A" }))).toMatchInlineSnapshot(
      `"a must be magnet uri format"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "A" } }))
    ).toMatchInlineSnapshot(`"b.a must be magnet uri format"`);
  });
});
