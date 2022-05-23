import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { DateFromUnixTimeMinDate } from "../../../src/date/DateFromUnixTime/MinDate";
import { getErrorMessages } from "../../utils/validation-messages";

describe("DateFromUnixTimeMinDate", () => {
  it("each config is a different brand", () => {
    const codec1 = DateFromUnixTimeMinDate(123);
    const codec2 = DateFromUnixTimeMinDate(124);

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = DateFromUnixTimeMinDate(124);

    expect(E.isRight(codec.decode(124))).toBe(true);
    expect(getErrorMessages(codec.decode(123))).toMatchInlineSnapshot(
      `"minimal allowed date for it is 1970-01-01T00:00:00.124Z"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: DateFromUnixTimeMinDate(124),
    });

    expect(getErrorMessages(theType.decode({ a: 123 }))).toMatchInlineSnapshot(
      `"minimal allowed date for a is 1970-01-01T00:00:00.124Z"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: 123 } }))
    ).toMatchInlineSnapshot(
      `"minimal allowed date for b.a is 1970-01-01T00:00:00.124Z"`
    );
  });
});
