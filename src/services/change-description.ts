import { getRepository } from 'typeorm'
import { User } from '../entities/user'

interface ChangeDescriptionServiceProps {
  idUser: number
  description: string
}

export const changeDescriptionService = async ({ idUser, description }: ChangeDescriptionServiceProps): Promise<void | Error> => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({ where: { id: idUser } })
  if (!user) {
    return new Error('Esse usuário não existe!')
  }
  user.description = description
  await userRepository.save(user)
}
