import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { DateFromUnixTimeMaxDate } from "../../../src/date/DateFromUnixTime/MaxDate";
import { getErrorMessages } from "../../utils/validation-messages";

describe("DateFromUnixTimeMaxDate", () => {
  it("each config is a different brand", () => {
    const codec1 = DateFromUnixTimeMaxDate(123);
    const codec2 = DateFromUnixTimeMaxDate(124);

    let a: t.TypeOf<typeof codec1> = null as any;
    let b: t.TypeOf<typeof codec2> = null as any;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = DateFromUnixTimeMaxDate(123);

    expect(E.isRight(codec.decode(123))).toBe(true);
    expect(getErrorMessages(codec.decode(124))).toMatchInlineSnapshot(
      `"maximal allowed date for it is 1970-01-01T00:00:00.123Z"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: DateFromUnixTimeMaxDate(123),
    });

    expect(getErrorMessages(theType.decode({ a: 124 }))).toMatchInlineSnapshot(
      `"maximal allowed date for a is 1970-01-01T00:00:00.123Z"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: 124 } }))
    ).toMatchInlineSnapshot(
      `"maximal allowed date for b.a is 1970-01-01T00:00:00.123Z"`
    );
  });
});
