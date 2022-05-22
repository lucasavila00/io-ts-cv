import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import type ValidatorJS from "validator";
import isHashValidator from "validator/lib/isHash";
import { nameFromCtx } from "../utils/ctx";

type IsHashBrand<T extends string> = {
  readonly [K in `IsHash_${T}`]: symbol;
};

/**
 * Check if the string is a hash of type algorithm.
 * Algorithm is one of ['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128',
 */
export const IsHash = <T extends ValidatorJS.HashAlgorithm>(algorithm: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsHashBrand<T>> =>
        isHashValidator(value, algorithm),
      ("IsHash_" + algorithm) as `IsHash_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a hash of type ${algorithm}`
  );
