import { Request, Response } from 'express'
import { readMessageService } from '../services/read-message'
import { badRequest, noContent, serverError } from '../utils/http-helper'
import { validateRequiredFields } from '../validators/validate-required-fields'

export const readMessageController = async (request: Request, response: Response): Promise<any> => {
  try {
    const requiredFields = [
      'idChatMessage'
    ]

    const error = validateRequiredFields(requiredFields, request.params)

    if (error) {
      return badRequest(response, error.message)
    }

    const { idChatMessage } = request.params as any

    const idUserRead = request.body.user.id

    const result = await readMessageService({
      idUserRead,
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
