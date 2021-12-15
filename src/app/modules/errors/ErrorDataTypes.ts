export type ErrorResponse = {
  status: boolean
  message: string
}

export const NetworkErrorResponse: ErrorResponse = {
  status: false,
  message: 'network error',
}
