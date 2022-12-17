import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entities/user'
import { unauthorized } from '../utils/http-helper'
import { compare } from '../utils/jwt'

export const isAuthenticatedMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  const authHeader = request.headers.authorization
  const [, accessToken] = authHeader ? authHeader.split('Bearer ') : ''

  if (!accessToken) {
    return unauthorized(response, 'Esse token não é válido!')
  }

  const decoded = await compare(accessToken)
  if (!decoded) {
    return unauthorized(response, 'Esse token não é válido!')
  }

  if (!decoded.data?.id) {
    return unauthorized(response, 'Esse usuário não é válido!')
  }

  const userRepository = getRepository(User)
  const user = await userRepository.findOne({ where: { id: decoded.data?.id } })
  if (!user) {
    return unauthorized(response, 'Esse usuário não é válido!')
  }

  request.body.user = user

  return next()
}
