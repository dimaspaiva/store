import { MissingParamError } from '../errors/MissingParam'
import { Controller } from '../protocols/controller'
import { HTTPRequest, HTTPResponse } from '../protocols/http'

export class CreateProductController implements Controller {
  async handle (httpRequest: HTTPRequest): Promise<HTTPResponse> {

    if (!httpRequest.body.product.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    } else if (!httpRequest.body.product.description) {
      return {
        statusCode: 400,
        body: new MissingParamError('description')
      }
    }
  }
}
