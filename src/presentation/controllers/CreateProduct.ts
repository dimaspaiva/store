import { MissingParamError } from '../errors/MissingParam'
import { Controller } from '../protocols/controller'
import { HTTPRequest, HTTPResponse } from '../protocols/http'

export class CreateProductController implements Controller {
  async handle (httpRequest: HTTPRequest): Promise<HTTPResponse> {

    return {
      statusCode: 400,
      body: new MissingParamError('name')
    }
  }
}
