export class WrongParamTypeError extends Error {
  constructor(param: string, type: string) {
    super(`Param ${param} expected type: ${type}`)
  }
}