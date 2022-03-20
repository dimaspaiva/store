export class ServerError extends Error {
  constructor (errorMessage: string) {
    super(`Server error: ${errorMessage}`)
  }
}