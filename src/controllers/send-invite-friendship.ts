import { Request, Response } from 'express'
import { sendInviteFriendShipService } from '../services/send-invite-friendship'
import { badRequest, created, serverError } from '../utils/http-helper'
import { validateRequiredFields } from '../validators/validate-required-fields'

export const sendInviteFriendShipController = async (request: Request, response: Response): Promise<any> => {
  try {
    const requiredFields = [
      'idUserRecv'
    ]

    const error = validateRequiredFields(requiredFields, request.body)

    if (error) {
      return badRequest(response, error.message)
    }

    const { idUserRecv } = request.body

    const idUserSend = request.body.user.id

    const result = await sendInviteFriendShipService({
      idUserSend,
      idUserRecv
    })

    if (result instanceof Error) {
      return badRequest(response, result.message)
    }

    return created(response, null)
  } catch (error) {
    return serverError(response, error.message)
  }
}
