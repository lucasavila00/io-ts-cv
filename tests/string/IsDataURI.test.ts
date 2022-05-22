import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsDataURI } from "../../string/IsDataURI";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsDataURI", () => {
  it("works unwrapped", () => {
    const codec = IsDataURI;

    expect(
      E.isRight(
        codec.decode(
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        )
      )
    ).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a data uri format"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsDataURI,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a data uri format"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a data uri format"`);
  });
});
