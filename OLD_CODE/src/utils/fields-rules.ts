import i18n from '@/plugins/i18n.plugin'

const {
  global: { t: $t }
} = i18n

const isThisRefsValid = (refs) => {
  let result = []
  for (const el of Object.keys(refs)) {
    if (refs[el].rules && refs[el].errorHandler) {
      result.push(refs[el].errorHandler())
    }
  }
  result = result.every((el) => !el)
  return result
}

const fieldErrorHandler = (rules, value) => {
  let hasError = false
  if (Array.isArray(rules)) {
    let i = 0
    while (i < rules.length) {
      const result = rules[i](value)
      if (typeof result === 'string') {
        hasError = result
        break
      } else if (!hasError) {
        hasError = false
      }
      i++
    }
    return hasError
  } else {
    console.log('rules must be an array')
  }
}

const apiFieldsErrorHandler = ({ errors, refs }) => {
  if (errors.length && errors.some((el) => el.field)) {
    errors.forEach((error) => {
      if (error.field) {
        Object.keys(refs).forEach((refKey) => {
          if (
            refs[refKey].rules &&
            refs[refKey].errorHandler &&
            refKey === error.field // ref name and error.field name must match
          ) {
            refs[refKey].errorMsg = error.content
          }
        })
      }
    })
  }
}

// RULES RULES RULES RULES RULES
const required = (v, message) => !!v || message || $t('rules.required')

// example
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

// Unicode accepted --- [^<>()[\]\.,;:\s@\"]
const emailRegex2 = /^[^<>()[\]\.,;:\s@\"]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// Unicode NOT accepted --- \w
const emailRegex3 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const email = (v, message) => emailRegex3.test(v) || message || $t('rules.email')

const min = (v, min, message) => v.length >= min || message || $t('rules.min', { min })

const max = (v, max, message) => v.length <= max || message || $t('rules.max', { max })

const mismatch = (value1, value2, fieldName, message) =>
  value1 === value2 || message || $t('rules.pswMismatch', { fieldName })

const dateInRange = (minDate, maxDate, selectDate, messagefew, messageLot) => {
  return selectDate.valueOf() > maxDate.valueOf()
    ? messagefew || $t('rules.dateIsFew')
    : selectDate.valueOf() < minDate.valueOf()
    ? messageLot || $t('rules.dateIsLot')
    : ''
}

const containsNumber = (v, message) =>
  /\d/.test(v) || message || $t('rules.containsNumber')

const containsSymbol = (v, message) =>
  /[|\\/~^:,;?!&%$#@*+()]/.test(v) || message || $t('rules.containsSymbol')

const containsUpperCase = (v, message) =>
  /(?=.*[A-ZА-Я])/.test(v) || message || $t('rules.containsUpperCase')

const containsLowerCase = (v, message) =>
  /(?=.*[a-zа-я])/.test(v) || message || $t('rules.containsLowerCase')

export {
  required,
  email,
  min,
  max,
  mismatch,
  dateInRange,
  containsNumber,
  containsSymbol,
  containsUpperCase,
  containsLowerCase,
  isThisRefsValid,
  fieldErrorHandler,
  apiFieldsErrorHandler
}