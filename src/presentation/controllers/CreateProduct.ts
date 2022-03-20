import { MissingParamError } from '../errors/MissingParam'
import { WrongParamTypeError } from '../errors/WrongParamType'
import { Controller } from '../protocols/controller'
import { HTTPRequest, HTTPResponse } from '../protocols/http'

export class CreateProductController implements Controller {
  private requiredParams = ['name', 'description', 'amount']
  
  async handle (httpRequest: HTTPRequest): Promise<HTTPResponse> {    
    const missingParam = this.validateParams(httpRequest.body.product)

    if (missingParam) {
      return {
        statusCode: 400,
        body: new MissingParamError(missingParam)
      }
    }

    if (!this.isValidAmount(httpRequest.body.product.amount)) {
      return {
        statusCode: 400,
        body: new WrongParamTypeError('amount', 'number')
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

  isValidAmount(amount: any) {
    if (typeof amount !== 'number') {
      return false
    }
    return true
  }
}
