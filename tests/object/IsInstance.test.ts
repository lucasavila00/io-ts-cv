import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsInstance } from "../../src/object/IsInstance";
import { getErrorMessages } from "../utils/validation-messages";

class C1 {}

class C2 {}

describe("IsInstance", () => {
  it("works unwrapped", () => {
    const codec = IsInstance(C1);

    expect(E.isRight(codec.decode(new C1()))).toBe(true);
    expect(getErrorMessages(codec.decode(new C2()))).toMatchInlineSnapshot(
      `"it must be an instance of C1"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsInstance(C1),
    });

    expect(
      getErrorMessages(theType.decode({ a: new C2() }))
    ).toMatchInlineSnapshot(`"a must be an instance of C1"`);

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: new C2() } }))
    ).toMatchInlineSnapshot(`"b.a must be an instance of C1"`);
  });
});
