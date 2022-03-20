import { HTTPResponse } from "../protocols/http"

export const requestFailed = (error: Error): HTTPResponse => ({
  statusCode: 400,
  body: error
})