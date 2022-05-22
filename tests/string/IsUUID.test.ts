import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsUUID } from "../../string/IsUUID";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsUUID", () => {
  it("each version is a different brand", () => {
    const codec1 = IsUUID("4");
    const codec2 = IsUUID("5");

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = IsUUID("4");

    expect(
      E.isRight(codec.decode("02c22109-4c40-42b1-9867-84bd010cdae0"))
    ).toBe(true);
    expect(getErrorMessages(codec.decode("123"))).toMatchInlineSnapshot(
      `"it must be a UUID"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsUUID("4"),
    });

    expect(getErrorMessages(theType.decode({ a: "12" }))).toMatchInlineSnapshot(
      `"a must be a UUID"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "12" } }))
    ).toMatchInlineSnapshot(`"b.a must be a UUID"`);
  });
});
