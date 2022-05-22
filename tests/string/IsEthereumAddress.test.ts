import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { IsEthereumAddress } from "../../string/IsEthereumAddress";
import { getMessages as getErrorMessages } from "../utils/validation-messages";

describe("IsEthereumAddress", () => {
  it("works unwrapped", () => {
    const codec = IsEthereumAddress;

    expect(
      E.isRight(codec.decode("0x71c7656ec7ab88b098defb751b7401b5f6d8976f"))
    ).toBe(true);
    expect(getErrorMessages(codec.decode("-"))).toMatchInlineSnapshot(
      `"it must be an Ethereum address"`
    );
  });

  it("works wrapped", () => {
    const theType = t.type({
      a: IsEthereumAddress,
    });

    expect(getErrorMessages(theType.decode({ a: "-" }))).toMatchInlineSnapshot(
      `"a must be an Ethereum address"`
    );

    const wrappedMore = t.type({
      b: theType,
    });

    expect(
      getErrorMessages(wrappedMore.decode({ b: { a: "-" } }))
    ).toMatchInlineSnapshot(`"b.a must be an Ethereum address"`);
  });
});
