import { Request, Response } from 'express'
import { changeDescriptionService } from '../services/change-description'
import { badRequest, noContent, serverError } from '../utils/http-helper'
import { validateRequiredFields } from '../validators/validate-required-fields'

export const changeDescriptionController = async (request: Request, response: Response): Promise<any> => {
  try {
    const requiredFields = [
      'idChatMessage'
    ]

    const error = validateRequiredFields(requiredFields, request.body)

    if (error) {
      return badRequest(response, error.message)
    }

    const { description } = request.body

    const idUser = request.body.user.id

    const result = await changeDescriptionService({
      idUser,
      description
    })

    if (result instanceof Error) {
      return badRequest(response, result.message)
    }

    return noContent(response)
  } catch (error) {
    return serverError(response, error.message)
  }
}
