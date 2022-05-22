import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { DateFromNumberMaxDate } from "../../../src/date/DateFromNumber/MaxDate";
import { getErrorMessages } from "../../utils/validation-messages";

describe("DateFromNumberMaxDate", () => {
  it("each config is a different brand", () => {
    const codec1 = DateFromNumberMaxDate(123_000);
    const codec2 = DateFromNumberMaxDate(124_000);

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = DateFromNumberMaxDate(123_000);

    expect(E.isRight(codec.decode(123_000))).toBe(true);
    expect(getErrorMessages(codec.decode(124_000))).toMatchInlineSnapshot(
      `"maximal allowed date for it is 1970-01-01T00:02:03.000Z"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: DateFromNumberMaxDate(123_000),
    });

    expect(
      getErrorMessages(theType.decode({ a: 124_000 }))
    ).toMatchInlineSnapshot(
      `"maximal allowed date for a is 1970-01-01T00:02:03.000Z"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: 124_000 } }))
    ).toMatchInlineSnapshot(
      `"maximal allowed date for b.a is 1970-01-01T00:02:03.000Z"`
    );
  });
});
