export const validateRequiredFields = (requiredFields: string[], payload: any): void | Error => {
  for (const requiredField of requiredFields) {
    if (!payload[requiredField]) {
      return new Error(`${requiredField} é um campo obrigatório!`)
    }
  }
}
