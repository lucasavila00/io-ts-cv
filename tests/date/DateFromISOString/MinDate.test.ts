import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { DateFromISOStringMinDate } from "../../../src/date/DateFromISOString/MinDate";
import { getErrorMessages } from "../../utils/validation-messages";

describe("DateFromISOStringMinDate", () => {
  it("each config is a different brand", () => {
    const codec1 = DateFromISOStringMinDate("2022-05-22T17:07:07.787Z");
    const codec2 = DateFromISOStringMinDate("2021-05-22T17:07:07.787Z");

    let a: t.TypeOf<typeof codec1>;
    let b: t.TypeOf<typeof codec2>;

    //@ts-expect-error
    a = b;
    //@ts-expect-error
    b = a;
    expect(1).toBe(1);
  });

  it("works unwrapped", () => {
    const codec = DateFromISOStringMinDate("2023-05-22T17:07:07.787Z");

    expect(E.isRight(codec.decode("2023-05-22T17:07:07.787Z"))).toBe(true);
    expect(
      getErrorMessages(codec.decode("2022-05-22T17:07:07.787Z"))
    ).toMatchInlineSnapshot(
      `"minimal allowed date for it is 2023-05-22T17:07:07.787Z"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: DateFromISOStringMinDate("2023-05-22T17:07:07.787Z"),
    });

    expect(
      getErrorMessages(theType.decode({ a: "2022-05-22T17:07:07.787Z" }))
    ).toMatchInlineSnapshot(
      `"minimal allowed date for a is 2023-05-22T17:07:07.787Z"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(
        wrappedMore.decode({ b: { a: "2022-05-22T17:07:07.787Z" } })
      )
    ).toMatchInlineSnapshot(
      `"minimal allowed date for b.a is 2023-05-22T17:07:07.787Z"`
    );
  });
});
