import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsFirebasePushId } from "../../string/IsFirebasePushId";
import { getMessages as getErrorMessages } from "../utils/validation-messages";

describe("IsFirebasePushId", () => {
  it("works unwrapped", () => {
    const codec = IsFirebasePushId;

    expect(E.isRight(codec.decode("aaaaaaaaaaaaaaaaaaaa"))).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be a Firebase Push Id"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsFirebasePushId,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be a Firebase Push Id"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be a Firebase Push Id"`);
  });
});
