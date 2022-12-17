import { Response } from 'express'

const badRequest = (response: Response, message: string): any => {
  return response.status(400).json({ message })
}

const unauthorized = (response: Response, message: string): any => {
  return response.status(401).json({ message })
}

const serverError = (response: Response, message: string): any => {
  return response.status(500).json({ message })
}

const noContent = (response: Response): any => {
  return response.status(204).send()
}

const created = (response: Response, data: any): any => {
  return response.status(201).json(data)
}

const ok = (response: Response, data: any): any => {
  return response.status(200).json(data)
}

export { badRequest, unauthorized, serverError, noContent, created, ok }
