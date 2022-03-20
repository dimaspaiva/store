export class WrongParamValueError extends Error { 
  constructor(param: string, expected: string) {
    super(`Param ${param} with wrong value, expected ${expected}`)
  }
}