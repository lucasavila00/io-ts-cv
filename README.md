# io-ts-cv

One-to-one reimplementation of [class-validator's](https://github.com/typestack/class-validator) validators in io-ts ecosystem.

Install from NPM:

```
npm i io-ts-cv
```

# Using

```ts
import * as t from "io-ts";
import { IsUUID } from "io-ts-cv";
// or import { IsUUID } from "io-ts-cv/lib/string/IsUUID";
// or import { IsUUID } from "io-ts-cv/es6/string/IsUUID";

const myType = t.type({
  uuid: IsUUID(4),
});

console.log(myType.decode({ uuid: "02c22109-4c40-42b1-9867-84bd010cdae0" }));
// {
//     _tag: 'Right',
//     right: { uuid: '02c22109-4c40-42b1-9867-84bd010cdae0' }
// }

console.log(myType.decode({ uuid: "abc" }));
// {
//     _tag: 'Left',
//     left: [
//         {
//         value: 'abc',
//         context: [Array],
//         message: 'uuid must be a UUID',
//         actual: 'abc'
//         }
//     ]
// }
```

# Codecs

| Codec                                          | Description                                                                                                                                                                                           |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Common validation decorators**               |                                                                                                                                                                                                       |
| `Equals(comparison: any)`                      | Checks if value equals ("===") comparison.                                                                                                                                                            |
| `NotEquals(comparison: any)`                   | Checks if value not equal ("!==") comparison.                                                                                                                                                         |
| `IsIn(values: any[])`                          | Checks if value is in a array of allowed values.                                                                                                                                                      |
| `IsNotIn(values: any[])`                       | Checks if value is not in a array of disallowed values.                                                                                                                                               |
| **Number validation decorators**               |                                                                                                                                                                                                       |
| `IsDivisibleBy(num: number)`                   | Checks if the value is a number that's divisible by another.                                                                                                                                          |
| `IsPositive`                                   | Checks if the value is a positive number greater than zero.                                                                                                                                           |
| `IsNegative`                                   | Checks if the value is a negative number smaller than zero.                                                                                                                                           |
| `Min(min: number)`                             | Checks if the given number is greater than or equal to given number.                                                                                                                                  |
| `Max(max: number)`                             | Checks if the given number is less than or equal to given number.                                                                                                                                     |
| **Date validation decorators**                 |                                                                                                                                                                                                       |
| `DateFromISOStringMinDate(date: string)`       | Checks if the value is a date that's after the specified date.                                                                                                                                        |
| `DateFromISOStringMaxDate(date: string)`       | Checks if the value is a date that's before the specified date.                                                                                                                                       |
| `DateFromNumberMinDate(date: number)`          | Checks if the value is a date that's after the specified date.                                                                                                                                        |
| `DateFromNumberMaxDate(date: number)`          | Checks if the value is a date that's before the specified date.                                                                                                                                       |
| `DateFromUnixTimeMinDate(date: number)`        | Checks if the value is a date that's after the specified date.                                                                                                                                        |
| `DateFromUnixTimeMaxDate(date: number)`        | Checks if the value is a date that's before the specified date.                                                                                                                                       |
| **String-type validation decorators**          |                                                                                                                                                                                                       |
| `IsBooleanString`                              | Checks if a string is a boolean (e.g. is "true" or "false").                                                                                                                                          |
| `IsDateString`                                 | Alias for `IsISO8601`.                                                                                                                                                                                |
| `IsNumberString(options?: IsNumericOptions)`   | Checks if a string is a number.                                                                                                                                                                       |
| **String validation decorators**               |                                                                                                                                                                                                       |
| `Contains(seed: string)`                       | Checks if the string contains the seed.                                                                                                                                                               |
| `NotContains(seed: string)`                    | Checks if the string not contains the seed.                                                                                                                                                           |
| `IsEmpty`                                      | Checks if given value is empty (=== '', === null, === undefined).                                                                                                                                     |
| `IsNotEmpty`                                   | Checks if given value is not empty (!== '', !== null, !== undefined).                                                                                                                                 |
| `IsAlpha`                                      | Checks if the string contains only letters (a-zA-Z).                                                                                                                                                  |
| `IsAlphanumeric`                               | Checks if the string contains only letters and numbers.                                                                                                                                               |
| `IsDecimal(options?: IsDecimalOptions)`        | Checks if the string is a valid decimal value. Default IsDecimalOptions are `force_decimal=False`, `decimal_digits: '1,'`, `locale: 'en-US'`                                                          |
| `IsAscii`                                      | Checks if the string contains ASCII chars only.                                                                                                                                                       |
| `IsBase32`                                     | Checks if a string is base32 encoded.                                                                                                                                                                 |
| `IsBase64`                                     | Checks if a string is base64 encoded.                                                                                                                                                                 |
| `IsIBAN`                                       | Checks if a string is a IBAN (International Bank Account Number).                                                                                                                                     |
| `IsBIC`                                        | Checks if a string is a BIC (Bank Identification Code) or SWIFT code.                                                                                                                                 |
| `IsByteLength(min: number, max?: number)`      | Checks if the string's length (in bytes) falls in a range.                                                                                                                                            |
| `IsCreditCard`                                 | Checks if the string is a credit card.                                                                                                                                                                |
| `IsCurrency(options?: IsCurrencyOptions)`      | Checks if the string is a valid currency amount.                                                                                                                                                      |
| `IsEthereumAddress`                            | Checks if the string is an Ethereum address using basic regex. Does not validate address checksums.                                                                                                   |
| `IsBtcAddress`                                 | Checks if the string is a valid BTC address.                                                                                                                                                          |
| `IsDataURI`                                    | Checks if the string is a data uri format.                                                                                                                                                            |
| `IsEmail(options?: IsEmailOptions)`            | Checks if the string is an email.                                                                                                                                                                     |
| `IsFQDN(options?: IsFQDNOptions)`              | Checks if the string is a fully qualified domain name (e.g. domain.com).                                                                                                                              |
| `IsFullWidth`                                  | Checks if the string contains any full-width chars.                                                                                                                                                   |
| `IsHalfWidth`                                  | Checks if the string contains any half-width chars.                                                                                                                                                   |
| `IsVariableWidth`                              | Checks if the string contains a mixture of full and half-width chars.                                                                                                                                 |
| `IsHexColor`                                   | Checks if the string is a hexadecimal color.                                                                                                                                                          |
| `IsHSLColor`                                   | Checks if the string is an HSL color based on [CSS Colors Level 4 specification](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).                                                       |
| `IsRgbColor(options?: IsRgbOptions)`           | Checks if the string is a rgb or rgba color.                                                                                                                                                          |
| `IsIdentityCard(locale?: string)`              | Checks if the string is a valid identity card code.                                                                                                                                                   |
| `IsPassportNumber(countryCode?: string)`       | Checks if the string is a valid passport number relative to a specific country code.                                                                                                                  |
| `IsPostalCode(locale?: string)`                | Checks if the string is a postal code.                                                                                                                                                                |
| `IsHexadecimal`                                | Checks if the string is a hexadecimal number.                                                                                                                                                         |
| `IsOctal`                                      | Checks if the string is a octal number.                                                                                                                                                               |
| `IsMACAddress(options?: IsMACAddressOptions)`  | Checks if the string is a MAC Address.                                                                                                                                                                |
| `IsIP(version?: "4"\|"6")`                     | Checks if the string is an IP (version 4 or 6).                                                                                                                                                       |
| `IsPort`                                       | Checks if the string is a valid port number.                                                                                                                                                          |
| `IsISBN(version?: "10"\|"13")`                 | Checks if the string is an ISBN (version 10 or 13).                                                                                                                                                   |
| `IsEAN`                                        | Checks if the string is an if the string is an EAN (European Article Number).                                                                                                                         |
| `IsISIN`                                       | Checks if the string is an ISIN (stock/security identifier).                                                                                                                                          |
| `IsISO8601(options?: IsISO8601Options)`        | Checks if the string is a valid ISO 8601 date format. Use the option strict = true for additional checks for a valid date.                                                                            |
| `IsJSON`                                       | Checks if the string is valid JSON.                                                                                                                                                                   |
| `IsJWT`                                        | Checks if the string is valid JWT.                                                                                                                                                                    |
| `IsObject`                                     | Checks if the object is valid Object (null, functions, arrays will return false).                                                                                                                     |
| `IsNotEmptyObject`                             | Checks if the object is not empty.                                                                                                                                                                    |
| `IsLowercase`                                  | Checks if the string is lowercase.                                                                                                                                                                    |
| `IsLatLong`                                    | Checks if the string is a valid latitude-longitude coordinate in the format lat, long.                                                                                                                |
| `IsLatitude`                                   | Checks if the string or number is a valid latitude coordinate.                                                                                                                                        |
| `IsLongitude`                                  | Checks if the string or number is a valid longitude coordinate.                                                                                                                                       |
| `IsMobilePhone(locale: string)`                | Checks if the string is a mobile phone number.                                                                                                                                                        |
| `IsISO31661Alpha2`                             | Checks if the string is a valid ISO 3166-1 alpha-2 officially assigned country code.                                                                                                                  |
| `IsISO31661Alpha3`                             | Checks if the string is a valid ISO 3166-1 alpha-3 officially assigned country code.                                                                                                                  |
| `IsLocale`                                     | Checks if the string is a locale.                                                                                                                                                                     |
| `IsPhoneNumber(region: string)`                | Checks if the string is a valid phone numberusing libphonenumber-js.                                                                                                                                  |
| `IsMongoId`                                    | Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.                                                                                                                     |
| `IsMultibyte`                                  | Checks if the string contains one or more multibyte chars.                                                                                                                                            |
| `IsNumberString(options?: IsNumericOptions)`   | Checks if the string is numeric.                                                                                                                                                                      |
| `IsSurrogatePair`                              | Checks if the string contains any surrogate pairs chars.                                                                                                                                              |
| `IsUrl(options?: IsURLOptions)`                | Checks if the string is an url.                                                                                                                                                                       |
| `IsMagnetURI`                                  | Checks if the string is a [magnet uri format](https://en.wikipedia.org/wiki/Magnet_URI_scheme).                                                                                                       |
| `IsUUID(version?: "3"\|"4"\|"5"\|"all")`       | Checks if the string is a UUID (version 3, 4, 5 or all ).                                                                                                                                             |
| `IsFirebasePushId`                             | Checks if the string is a [Firebase Push ID](https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html)                                                                          |
| `IsUppercase`                                  | Checks if the string is uppercase.                                                                                                                                                                    |
| `Length(min: number, max?: number)`            | Checks if the string's length falls in a range.                                                                                                                                                       |
| `MinLength(min: number)`                       | Checks if the string's length is not less than given number.                                                                                                                                          |
| `MaxLength(max: number)`                       | Checks if the string's length is not more than given number.                                                                                                                                          |
| `Matches(pattern: RegExp, modifiers?: string)` | Checks if string matches the pattern. Either matches('foo', /foo/i) or matches('foo', 'foo', 'i').                                                                                                    |
| `IsMilitaryTime`                               | Checks if the string is a valid representation of military time in the format HH:MM.                                                                                                                  |
| `IsHash(algorithm: string)`                    | Checks if the string is a hash The following types are supported:`md4`, `md5`, `sha1`, `sha256`, `sha384`, `sha512`, `ripemd128`, `ripemd160`, `tiger128`, `tiger160`, `tiger192`, `crc32`, `crc32b`. |
| `IsMimeType`                                   | Checks if the string matches to a valid [MIME type](https://en.wikipedia.org/wiki/Media_type) format                                                                                                  |
| `IsSemVer`                                     | Checks if the string is a Semantic Versioning Specification (SemVer).                                                                                                                                 |
| `IsISSN(options?: IsISSNOptions)`              | Checks if the string is a ISSN.                                                                                                                                                                       |
| `IsISRC`                                       | Checks if the string is a [ISRC](https://en.wikipedia.org/wiki/International_Standard_Recording_Code).                                                                                                |
| `IsRFC3339`                                    | Checks if the string is a valid [RFC 3339](https://tools.ietf.org/html/rfc3339) date.                                                                                                                 |
| **Array validation decorators**                |                                                                                                                                                                                                       |
| `ArrayContains(values: any[])`                 | Checks if array contains all values from the given array of values.                                                                                                                                   |
| `ArrayNotContains(values: any[])`              | Checks if array does not contain any of the given values.                                                                                                                                             |
| `ArrayNotEmpty`                                | Checks if given array is not empty.                                                                                                                                                                   |
| `ArrayMinSize(min: number)`                    | Checks if the array's length is greater than or equal to the specified number.                                                                                                                        |
| `ArrayMaxSize(max: number)`                    | Checks if the array's length is less or equal to the specified number.                                                                                                                                |
| `ArrayUnique(identifier?: (o) => any)`         | Checks if all array's values are unique. Comparison for objects is reference-based. Optional function can be speciefied which return value will be used for the comparsion.                           |
| **Object validation decorators**               |                                                                                                                                                                                                       |
| `IsInstance(value: any)`                       | Checks if the property is an instance of the passed value.                                                                                                                                            |

# Deprecations

Some codecs are marked as deprecated as they're not fully type safe. Create your own branded types in such cases.

For example, an IsEmail codec:

```ts
import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isEmailValidator from "validator/lib/isEmail";
import { nameFromCtx } from "io-ts-cv";

export interface MyIsEmailBrand {
  readonly MyIsEmail: unique symbol;
}

export const MyIsEmail = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, MyIsEmailBrand> =>
      isEmailValidator(value, { require_tld: true }),
    "MyIsEmail"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be an email`
);
```
