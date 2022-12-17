import isEmail from 'validator/lib/isEmail'

export const validateEmail = (field: string, payload: any): void | Error => {
  const email = payload[field]
  if (!email) {
    return new Error(`${field} é inválido!`)
  }

  const isEmailValid = !isEmail(email)

  if (!isEmailValid) {
    return new Error(`${field} é inválido!`)
  }
}
