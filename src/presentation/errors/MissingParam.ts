export class MissingParamError extends Error {
  constructor(param: String) {
    super(`[Failed] Missing param: ${param}`)
  }
  
}