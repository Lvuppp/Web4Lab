import { Request, Response, NextFunction } from 'express'

export class CustomError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export const errorHandlerMiddleware = (
  error: CustomError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof CustomError) {
    const status = error.status
    const message = error.message || 'Unknown Error'
    res.status(status).json({ message: message })
  } else {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
