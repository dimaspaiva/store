import { HTTPRequest, HTTPResponse } from '../protocols/http'

export interface Controller {
  handle(httpRequest: HTTPRequest): Promise<HTTPResponse>
}
