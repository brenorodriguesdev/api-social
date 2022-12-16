import { getRepository } from 'typeorm'
import { InviteFriendShip } from '../entities/invite-friendship'
import { User } from '../entities/user'

interface AcceptInviteFriendShipProps {
  idUser: number
  idInviteFriendShip: number
}

export const acceptInviteFriendShipService = async ({ idUser, idInviteFriendShip }: AcceptInviteFriendShipProps): Promise<void | Error> => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({ where: { id: idUser } })
  if (!user) {
    return new Error('Esse usuário não existe!')
  }

  const inviteFriendShipRepository = getRepository(InviteFriendShip)
  const inviteFriendShip = await inviteFriendShipRepository.findOne({ where: { id: idInviteFriendShip } })
  if (!inviteFriendShip) {
    return new Error('Esse convite de amizade não existe!')
  }

  if (inviteFriendShip.accepted_at) {
    return new Error('Esse convite já foi aceito!')
  }

  if (inviteFriendShip.refused_at) {
    return new Error('Esse convite já foi recusado!')
  }

  inviteFriendShip.accepted_at = new Date()
  await inviteFriendShipRepository.save(inviteFriendShip)
}
