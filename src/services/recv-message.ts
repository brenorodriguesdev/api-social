import { getRepository } from 'typeorm'
import { ChatMessage } from '../entities/chat-message'
import { User } from '../entities/user'

interface RecvMessageServiceProps {
  idChatMessage: number
  idUserRecv: number
}

export const recvMessageService = async ({ idChatMessage, idUserRecv }: RecvMessageServiceProps): Promise<void | Error> => {
  const userRepository = getRepository(User)
  const userRecv = await userRepository.findOne({ where: { id: idUserRecv } })
  if (!userRecv) {
    return new Error('Esse usuário não existe!')
  }
  const chatMessageRepository = getRepository(ChatMessage)
  const chatMessage = await chatMessageRepository.findOne({ where: { id: idChatMessage }, relations: ['chat', 'chat.other'] })
  if (!chatMessage) {
    return new Error('Essa mensagem não existe!')
  }

  if (chatMessage.chat.other.id !== userRecv.id) {
    return new Error('Esse usuário não pode receber essa mensagem!')
  }

  chatMessage.recv_at = new Date()
  await chatMessageRepository.save(chatMessage)
}
