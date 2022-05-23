import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsNotEmptyObject } from "../../src/object/IsNotEmptyObject";
import { getErrorMessages } from "../utils/validation-messages";

describe("IsNotEmptyObject", () => {
  it("each config is a different brand", () => {
    const codec1 = IsNotEmptyObject(true);
    const codec2 = IsNotEmptyObject(false);

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped, non-nullable", () => {
    const codec = IsNotEmptyObject(false);

    expect(E.isRight(codec.decode({ a: null }))).toBe(true);
    expect(E.isRight(codec.decode({ a: 1 }))).toBe(true);
    expect(getErrorMessages(codec.decode({}))).toMatchInlineSnapshot(
      `"it must be a non-empty object"`
    );
  });

  it("works unwrapped, nullable", () => {
    const codec = IsNotEmptyObject(true);

    expect(E.isRight(codec.decode({ a: 1 }))).toBe(true);
    expect(getErrorMessages(codec.decode({ a: null }))).toMatchInlineSnapshot(
      `"it must be a non-empty object"`
    );
    expect(getErrorMessages(codec.decode({}))).toMatchInlineSnapshot(
      `"it must be a non-empty object"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsNotEmptyObject(true),
    });

    expect(getErrorMessages(theType.decode({ a: {} }))).toMatchInlineSnapshot(
      `"a must be a non-empty object"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: {} } }))
    ).toMatchInlineSnapshot(`"b.a must be a non-empty object"`);
  });
});
