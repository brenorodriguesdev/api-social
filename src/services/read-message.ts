import { getRepository } from 'typeorm'
import { ChatMessage } from '../entities/chat-message'
import { User } from '../entities/user'

interface ReadMessageServiceProps {
  idChatMessage: number
  idUserRead: number
}

export const readMessageService = async ({ idChatMessage, idUserRead }: ReadMessageServiceProps): Promise<void | Error> => {
  const userRepository = getRepository(User)
  const userRecv = await userRepository.findOne({ where: { id: idUserRead } })
  if (!userRecv) {
    return new Error('Esse usuário não existe!')
  }
  const chatMessageRepository = getRepository(ChatMessage)
  const chatMessage = await chatMessageRepository.findOne({ where: { id: idChatMessage }, relations: ['chat', 'chat.other'] })
  if (!chatMessage) {
    return new Error('Essa mensagem não existe!')
  }

  if (chatMessage.chat.other.id !== userRecv.id) {
    return new Error('Esse usuário não pode ler essa mensagem!')
  }

  chatMessage.read_at = new Date()
  await chatMessageRepository.save(chatMessage)
}
