export class MissingEntityError extends Error {
  constructor(entityName: string) {
    super(`Missing important entity ${entityName}`)
  }
}