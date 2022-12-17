export const validateEmail = (field: string, payload: any): void | Error => {
  if (!payload[field]) {
    return new Error(`${field} é inválido!`)
  }
}
