import { getRepository } from 'typeorm'
import { InviteFriendShip } from '../entities/invite-friendship'
import { User } from '../entities/user'

interface RefuseInviteFriendShipProps {
  idUser: number
  idInviteFriendShip: number
}

export const refuseInviteFriendShipService = async ({ idUser, idInviteFriendShip }: RefuseInviteFriendShipProps): Promise<void | Error> => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({ where: { id: idUser } })
  if (!user) {
    return new Error('Esse usuário não existe!')
  }

  const inviteFriendShipRepository = getRepository(InviteFriendShip)
  const inviteFriendShip = await inviteFriendShipRepository.findOne({ where: { id: idInviteFriendShip }, relations: ['userReceived'] })
  if (!inviteFriendShip) {
    return new Error('Esse convite de amizade não existe!')
  }

  if (inviteFriendShip.userReceived.id !== user.id) {
    return new Error('Esse convite não foi enviado para esse usuário!')
  }

  if (inviteFriendShip.accepted_at) {
    return new Error('Esse convite já foi aceito!')
  }

  if (inviteFriendShip.refused_at) {
    return new Error('Esse convite já foi recusado!')
  }

  inviteFriendShip.refused_at = new Date()
  await inviteFriendShipRepository.save(inviteFriendShip)
}
