import { getRepository } from 'typeorm'
import { Chat } from '../entities/chat'
import { ChatMessage } from '../entities/chat-message'
import { User } from '../entities/user'

interface SendMessageServiceProps {
  idSend: number
  idRecv: number
  message: string
}

interface GetChatServiceProps {
  userSend: User
  userRecv: User
}

const getChat = async ({ userSend, userRecv }: GetChatServiceProps): Promise<Chat> => {
  const chatRepository = getRepository(Chat)
  let chat = await chatRepository.findOne({ where: { user_opened: userSend, other: userRecv } })
  if (!chat) {
    const newChat = new Chat()
    newChat.user_opened = userSend
    newChat.other = userRecv
    newChat.create_at = new Date()
    chat = await chatRepository.save(newChat)
  }
  return chat
}

interface CreateChatMessageServiceProps {
  userSend: User
  message: string
  chat: Chat
}

const createChatMessage = ({ userSend, message, chat }: CreateChatMessageServiceProps): ChatMessage => {
  const chatMessage = new ChatMessage()
  chatMessage.user_sent = userSend
  chatMessage.chat = chat
  chatMessage.message = message
  chatMessage.create_at = new Date()
  return chatMessage
}

export const sendMessageService = async ({ idSend, idRecv, message }: SendMessageServiceProps): Promise<void | Error> => {
  const userRepository = getRepository(User)
  const userSend = await userRepository.findOne({ where: { id: idSend } })
  if (!userSend) {
    return new Error('Usuário que enviará a mensagem não existe!')
  }

  const userRecv = await userRepository.findOne({ where: { id: idRecv } })
  if (!userRecv) {
    return new Error('Usuário que receberá a mensagem não existe!')
  }

  const chat = await getChat({ userSend, userRecv })

  const chatMessage = createChatMessage({ userSend, message, chat })
  const chatMessageRepository = getRepository(ChatMessage)
  await chatMessageRepository.save(chatMessage)
}
