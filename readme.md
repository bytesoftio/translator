# @bytesoftio/translator

## Installation

`yarn add @bytesoftio/translator` or `npm install @bytesoftio/translator`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [createTranslator](#createtranslator)
- [ObservableTranslator](#observabletranslator)
- [Usage in React](#usage-in-react)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

A very simple library to handle translations.

## createTranslator

Creates a new instance of `ObservableTranslator`.

```ts
import { createTranslator } from "@bytesoftio/translator"

const translations = {
  en: { title: "Foo", about: { company: "Acme" } },
  de: { title: "Bar" }
}
const language = "de"
const fallbackLanguage = "en"

const translator = createTranslator(translations, language, fallbackLanguage)
```

## ObservableTranslator

A quick tour of the available methods:

```ts
import { createTranslator } from "@bytesoftio/translator"

const translator = createTranslator({ en: { title: "Foo", about: "https://$1", nested: { text: "Bar" } }}, "en")

// get current language
translator.getLanguage()

// change current language
translator.setLanguage("de")

// get available languages
translator.getLanguages()

// get all translations
translator.getTranslations()

// get translations for a specific language
translator.getTranslationsForLanguage("en")

// replace all translations
translator.setTranslations({ en: { /* ... */ }})

// replace translations for a specific language
translator.setTranslationsForLanguage("en", { /* ... */ })

// add translations for multiple languages at once
translator.addTranslations({ en: { title: "Bar" } })

// add translations for a specific language
translator.addTranslationsForLanguage("en", { subtitle: "Yolo" })

// get fallback language ...
translator.getFallbackLanguage()

// update fallback language
translator.setFallbackLanguage("en")

// get a translated string, returns "Foo"
translator.get("title")

// get an interpolated translated string, returns "https://github.com"
translator.get("about", ["github.com"])

// get translation for a specific language, returns "{ title }"
translator.get("title", undefined, "de")

// get translation with a nestted key, returns "Bar"
translator.get("nested.text")

// check if a translation exists
translator.has("foo")

// check if a translation exists for a specific language
translator.has("foo", "de")

// listen to language, translations or fallbackLanguage changes
translator.listen(translator => console.log(translator.getLanguage()))

// create a nested translate function, all translation keys be prefixed with the given scope "nested"
const scopedTranslate = translator.scope("nested")

// same as translator.get("nested.text")
scopedTranslate("text")
```

## Usage in React

This package provides a seemles integration with React hooks: [@bytesoftio/use-translator](https://github.com/bytesoftio/use-translator)