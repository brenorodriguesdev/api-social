import { Request, Response } from 'express'
import { signInService } from '../services/sign-in'
import { badRequest, ok, serverError } from '../utils/http-helper'
import { validateRequiredFields } from '../validators/validate-required-fields'

export const signInController = async (request: Request, response: Response): Promise<any> => {
  try {
    const requiredFields = [
      'email',
      'password'
    ]

    const error = validateRequiredFields(requiredFields, request.body)

    if (error) {
      return badRequest(response, error.message)
    }

    const result = await signInService(request.body)

    if (result instanceof Error) {
      return badRequest(response, result.message)
    }

    return ok(response, result)
  } catch (error) {
    return serverError(response, error.message)
  }
}
