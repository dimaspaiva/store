import { MissingParamError } from '../errors/MissingParam'
import { Controller } from '../protocols/controller'
import { HTTPRequest, HTTPResponse } from '../protocols/http'

export class CreateProductController implements Controller {
  private requiredParams = ['name', 'description']
  
  async handle (httpRequest: HTTPRequest): Promise<HTTPResponse> {    
    const missingParam = this.validateParams(httpRequest.body.product)

    if (missingParam) {
      return {
        statusCode: 400,
        body: new MissingParamError(missingParam)
      }
    }
  }

  validateParams(product: any) {
    for(const param of this.requiredParams) {
      if (!product[param]) {
        return param
      }
    }
  }
}
