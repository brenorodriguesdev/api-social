import { Request, Response } from 'express'
import { acceptInviteFriendShipService } from '../services/accept-invite-friendship'
import { badRequest, created, serverError } from '../utils/http-helper'
import { validateRequiredFields } from '../validators/validate-required-fields'

export const acceptInviteFriendShipController = async (request: Request, response: Response): Promise<any> => {
  try {
    const requiredFields = [
      'idInviteFriendShip'
    ]

    const error = validateRequiredFields(requiredFields, request.params)

    if (error) {
      return badRequest(response, error.message)
    }

    const { idInviteFriendShip } = request.params as any

    const idUser = request.body.user.id

    const result = await acceptInviteFriendShipService({
      idUser,
      idInviteFriendShip
    })

    if (result instanceof Error) {
      return badRequest(response, result.message)
    }

    return created(response, null)
  } catch (error) {
    return serverError(response, error.message)
  }
}
