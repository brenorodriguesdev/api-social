import { Request, Response } from 'express'
import { signUpService } from '../services/sign-up'
import { badRequest, created, serverError } from '../utils/http-helper'
import { validateEmail, validateRequiredFields } from '../validators'

export const signUpController = async (request: Request, response: Response): Promise<any> => {
  try {
    const requiredFields = [
      'email',
      'name',
      'password'
    ]

    const error = validateRequiredFields(requiredFields, request.body)

    if (error) {
      return badRequest(response, error.message)
    }

    const emailError = validateEmail('email', request.body)

    if (emailError) {
      return badRequest(response, emailError.message)
    }

    const result = await signUpService(request.body)

    if (result instanceof Error) {
      return badRequest(response, result.message)
    }

    return created(response, null)
  } catch (error) {
    return serverError(response, error.message)
  }
}
