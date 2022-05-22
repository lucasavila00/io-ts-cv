import * as t from "io-ts";

export const nameFromCtx = (ctx: t.Context): string =>
  ctx
    .map((it) => it.key)
    .filter((it) => it.length > 0)
    .join(".") || "it";
