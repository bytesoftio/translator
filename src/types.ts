import { ObservableValue } from "@bytesoftio/value"

export interface ObservableTranslator {
  language: ObservableValue<string>
  fallbackLanguage: ObservableValue<string|undefined>
  translations: ObservableValue<Translations>

  getLanguage(): string
  setLanguage(language: string): void
  getLanguages(): string[]
  getFallbackLanguage(): string|undefined
  setFallbackLanguage(language: string): void
  getTranslations(): Translations
  addTranslations(translations: Translations): void
  addTranslationsForLanguage(language: string, translations: object): void

  get(key: string, replacements?: any[], language?: string): string
  has(key: string, language?: string): boolean

  listen(callback: TranslatorCallback)
  scope(scope: string): TranslateFunction
}

export type Translations = { [K: string]: object }
export type TranslateFunction = (key: string, replacements?: any[], language?: string) => string
export type TranslatorCallback = (translator: ObservableTranslator) => void
export type CreateTranslator = (translations: Translations, language: string, fallbackLanguage?: string) => ObservableTranslator
