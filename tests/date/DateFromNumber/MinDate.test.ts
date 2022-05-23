import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { DateFromNumberMinDate } from "../../../src/date/DateFromNumber/MinDate";
import { getErrorMessages } from "../../utils/validation-messages";

describe("DateFromNumberMinDate", () => {
  it("each config is a different brand", () => {
    const codec1 = DateFromNumberMinDate(123_000);
    const codec2 = DateFromNumberMinDate(124_000);

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = DateFromNumberMinDate(124_000);

    expect(E.isRight(codec.decode(124_000))).toBe(true);
    expect(getErrorMessages(codec.decode(123_000))).toMatchInlineSnapshot(
      `"minimal allowed date for it is 1970-01-01T00:02:04.000Z"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: DateFromNumberMinDate(124_000),
    });

    expect(
      getErrorMessages(theType.decode({ a: 123_000 }))
    ).toMatchInlineSnapshot(
      `"minimal allowed date for a is 1970-01-01T00:02:04.000Z"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: 123_000 } }))
    ).toMatchInlineSnapshot(
      `"minimal allowed date for b.a is 1970-01-01T00:02:04.000Z"`
    );
  });
});
