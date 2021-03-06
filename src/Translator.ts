import {
  ObservableTranslator,
  TranslateFunction,
  Translations,
  TranslatorCallback,
} from "./types"
import { translate } from "./translate"
import { compact, startsWith, keys, merge } from "lodash"
import { createValue, ObservableValue } from "@bytesoftio/value"

export class Translator implements ObservableTranslator {
  language: ObservableValue<string>
  fallbackLanguage: ObservableValue<string|undefined>
  translations: ObservableValue<Translations>

  constructor(translations: Translations, language: string, fallbackLanguage?: string) {
    this.language = createValue(language)
    this.translations = createValue(translations)
    this.fallbackLanguage = createValue(fallbackLanguage)
  }

  getLanguage(): string {
    return this.language.get()
  }

  setLanguage(language: string): void {
    this.language.set(language)
  }

  getLanguages(): string[] {
    return keys(this.getTranslations())
  }

  getTranslations(): Translations {
    return this.translations.get()
  }

  getTranslationsForLanguage(language: string): object {
    return this.getTranslations()[language] || {}
  }

  setTranslations(translations: Translations): void {
    this.translations.set(translations)
  }

  setTranslationsForLanguage(language: string, translations: object): void {
    this.setTranslations({...this.getTranslations(), [language]: translations})
  }

  addTranslations(translations: Translations): void {
    this.setTranslations(merge({}, this.getTranslations(), translations))
  }

  addTranslationsForLanguage(language: string, translations: object): void {
    this.addTranslations({[language]: translations})
  }

  getFallbackLanguage(): string|undefined {
    return this.fallbackLanguage.get()
  }

  setFallbackLanguage(language: string): void {
    this.fallbackLanguage.set(language)
  }

  get(key: string, replacements?: any[], language?: string, fallbackLanguage?: string): string {
    language = language ?? this.getLanguage()
    fallbackLanguage = fallbackLanguage ?? this.getFallbackLanguage()

    return translate(
      this.translations.get(),
      language,
      key,
      replacements,
      fallbackLanguage
    )
  }

  has(key: string, language?: string, fallbackLanguage?: string): boolean {
    language = language ?? this.getLanguage()
    fallbackLanguage = fallbackLanguage ?? this.getFallbackLanguage()

    const translation = this.get(key, [], language, fallbackLanguage)

    return translation !== `{ ${language}.${key} }`
  }

  listen(callback: TranslatorCallback, notifyImmediately?: boolean) {
    this.translations.listen(() => callback(this), notifyImmediately)
    this.language.listen(() => callback(this), notifyImmediately)
    this.fallbackLanguage.listen(() => callback(this), notifyImmediately)
  }

  scope(scope: string): TranslateFunction {
    const translate: TranslateFunction = (key: string, replacements?: any[], language?: string) => {
      const path = startsWith(key, "~") ? key.replace("~", "") : compact([scope, key]).join(".")

      return this.get(path, replacements, language)
    }

    return translate
  }
}
