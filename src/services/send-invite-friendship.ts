import { getRepository } from 'typeorm'
import { InviteFriendShip } from '../entities/invite-friendship'
import { User } from '../entities/user'

interface SendInviteFriendShipProps {
  idUserSend: number
  idUserRecv: number
}

export const sendInviteFriendShipService = async ({ idUserSend, idUserRecv }: SendInviteFriendShipProps): Promise<void | Error> => {
  const userRepository = getRepository(User)
  const userSend = await userRepository.findOne({ where: { id: idUserSend } })
  if (!userSend) {
    return new Error('Usuário que enviará o convite de amizade não existe!')
  }

  const userRecv = await userRepository.findOne({ where: { id: idUserRecv } })
  if (!userRecv) {
    return new Error('Usuário que receberá o convite de amizade não existe!')
  }

  const inviteFriendShipRepository = getRepository(InviteFriendShip)
  const inviteFriendShip = new InviteFriendShip()
  inviteFriendShip.userSent = userSend
  inviteFriendShip.userReceived = userRecv
  inviteFriendShip.create_at = new Date()
  await inviteFriendShipRepository.save(inviteFriendShip)
}
