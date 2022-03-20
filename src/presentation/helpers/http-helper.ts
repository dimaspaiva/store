import { HTTPResponse } from "../protocols/http"

export const requestFailed = (error: Error): HTTPResponse => ({
  statusCode: 400,
  body: error
})

export const internalServerError = (error: Error): HTTPResponse =>({
  statusCode: 500,
  body: error
})