import { Request, Response } from 'express'
import { sendMessageService } from '../services/send-message'
import { badRequest, created, serverError } from '../utils/http-helper'
import { validateRequiredFields } from '../validators/validate-required-fields'

export const sendMessageController = async (request: Request, response: Response): Promise<any> => {
  try {
    const requiredFields = [
      'idSend',
      'idRecv',
      'message'
    ]

    const error = validateRequiredFields(requiredFields, request.body)

    if (error) {
      return badRequest(response, error.message)
    }

    const { message, idRecv } = request.body

    const idSend = request.body.user.id

    const result = await sendMessageService({
      idSend,
      idRecv,
      message
    })

    if (result instanceof Error) {
      return badRequest(response, result.message)
    }

    return created(response, null)
  } catch (error) {
    return serverError(response, error.message)
  }
}
