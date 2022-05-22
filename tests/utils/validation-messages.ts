import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";

export const getMessages = (it: t.Validation<any>): string => {
  if (E.isLeft(it)) {
    return it.left
      .map((e) => {
        if (e.message == null) {
          throw new Error("no message in error");
        }
        return e.message;
      })
      .join("\n");
  }
  throw new Error("validation is not left");
};
