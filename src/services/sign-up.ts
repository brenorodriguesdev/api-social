import { getRepository } from 'typeorm'
import { User } from '../entities/user'
import { crypt } from '../utils/hash'

interface SignUpServiceProps {
  email: string
  name: string
  password: string
}

export const signUpService = async ({ email, name, password }: SignUpServiceProps): Promise<void | Error> => {
  const userRepository = getRepository(User)
  const isEmailAlreadyExist = await userRepository.find({ where: { email } })
  if (isEmailAlreadyExist) {
    return new Error('Esse e-mail já está em uso!')
  }

  const user = new User()
  user.email = email
  user.name = name
  const passwordHashed = await crypt(password)
  user.password = passwordHashed
  user.create_at = new Date()
  user.is_connected = false
  user.is_active = false

  await userRepository.save(user)
}
