import { templatize } from "./templatize"
import { get, isString } from "lodash"
import { Translations } from "./types"

export const translate = (locales: Translations, language: string, key: string, replacements: any[] = [], fallbackLanguage?: string) => {
  let translation = get(locales[language], key)

  if (translation === undefined && fallbackLanguage !== undefined) {
    translation = get(locales[fallbackLanguage], key)
  }

  if (isString(translation)) {
    return templatize(translation, replacements)
  }

  return `{ ${language}.${key} }`
}
