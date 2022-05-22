import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import type ValidatorJS from "validator";
import { nameFromCtx } from "../utils/ctx";
import isMobilePhoneValidator from "validator/lib/isMobilePhone";

interface IsMobilePhoneBrand {
  readonly IsMobilePhone: unique symbol;
}
/**
 * Checks if the string is a mobile phone number (locale is either an array of locales (e.g ['sk-SK', 'sr-RS'])
 * OR one of ['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', ar-JO', 'ar-KW', 'ar-SA', 'ar-SY', 'ar-TN', 'be-BY',
 * 'bg-BG', 'bn-BD', 'cs-CZ', 'da-DK', 'de-DE', 'de-AT', 'el-GR', 'en-AU', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-HK',
 * 'en-MO', 'en-IE', 'en-IN', 'en-KE', 'en-MT', 'en-MU', 'en-NG', 'en-NZ', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-UG',
 * 'en-US', 'en-TZ', 'en-ZA', 'en-ZM', 'es-CL', 'es-CR', 'es-EC', 'es-ES', 'es-MX', 'es-PA', 'es-PY', 'es-UY', 'et-EE',
 * 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-RE', 'he-IL', 'hu-HU', 'id-ID',
 * 'it-IT', 'ja-JP', 'kk-KZ', 'kl-GL', 'ko-KR', 'lt-LT', 'ms-MY', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL',
 * 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sl-SI', 'sk-SK', 'sr-RS', 'sv-SE', 'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN',
 * 'zh-HK', 'zh-MO', 'zh-TW']
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const IsMobilePhone = (
  locale?: ValidatorJS.MobilePhoneLocale,
  options?: ValidatorJS.IsMobilePhoneOptions
) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsMobilePhoneBrand> =>
        isMobilePhoneValidator(value, locale, options),
      "IsMobilePhone"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a phone number`
  );
