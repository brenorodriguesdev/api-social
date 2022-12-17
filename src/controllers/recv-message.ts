import { Request, Response } from 'express'
import { recvMessageService } from '../services/recv-message'
import { badRequest, noContent, serverError } from '../utils/http-helper'
import { validateRequiredFields } from '../validators/validate-required-fields'

export const recvMessageController = async (request: Request, response: Response): Promise<any> => {
  try {
    const requiredFields = [
      'idChatMessage'
    ]

    const error = validateRequiredFields(requiredFields, request.params)

    if (error) {
      return badRequest(response, error.message)
    }

    const { idChatMessage } = request.params as any

    const idUserRecv = request.body.user.id

    const result = await recvMessageService({
      idUserRecv,
      idChatMessage
    })

    if (result instanceof Error) {
      return badRequest(response, result.message)
    }

    return noContent(response)
  } catch (error) {
    return serverError(response, error.message)
  }
}
