import { getRepository } from 'typeorm'
import { User } from '../entities/user'
import { compare } from '../utils/hash'
import { generate } from '../utils/jwt'

export interface SignInServiceProps {
  email: string
  password: string
}

export const signInService = async ({ email, password }): Promise<string | Error> => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({ where: { email } })
  if (!user) {
    return new Error('E-mail ou senha inválido!')
  }
  const isPasswordValid = await compare(password, user.password)
  if (!isPasswordValid) {
    return new Error('E-mail ou senha inválido!')
  }
  const token = await generate(user)
  return token
}
