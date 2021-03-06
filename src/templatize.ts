import { isArray, isObjectLike, isString } from "lodash"

export const templatize = (template: string, replacements: any[]): string => {
  const message = replacements.reduce((message: string, replacement, index) => {
    const regex = new RegExp(`\\$${index + 1}`, "g")
    const value = templatizeValue(replacement)

    return message.replace(regex, value)
  }, template)

  return message
}
const templatizeValue = (value: any): string => {
  if (isArray(value)) return templatizeArray(value)
  if (isObjectLike(value)) return templatizeObject(value)

  return templatizeCommon(value)
}
const templatizeArray = (value: any[]): string => JSON.stringify(value)
const templatizeObject = (value: object): string => JSON.stringify(value)
const templatizeCommon = (value: any): string => isString(value) ? value : JSON.stringify(value)