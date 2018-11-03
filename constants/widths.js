export const SM = '600px'
export const MD = '900px'
export const LG = '1200px'

export function minWidth(width) {
  return `@media screen and (min-width: ${width})`
}

export function maxWidth(width) {
  return `@media screen and (max-width: ${width})`
}
