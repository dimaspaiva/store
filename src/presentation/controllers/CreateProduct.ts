import { MissingEntityError } from '../errors/MissingEntity'
import { MissingParamError } from '../errors/MissingParam'
import { WrongParamTypeError } from '../errors/WrongParamType'
import { WrongParamValueError } from '../errors/WrongParamValue'
import { requestFailed } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HTTPRequest, HTTPResponse } from '../protocols/http'
import { IdGenerator } from '../protocols/idGenerator'

export class CreateProductController implements Controller {
  private readonly idGenerator:  IdGenerator
  private requiredParams = ['name', 'description', 'amount']

  constructor (idGenerator: IdGenerator) {
    this.idGenerator =  idGenerator
  }

  async handle (httpRequest: HTTPRequest): Promise<HTTPResponse> {    
    if (!httpRequest.body.product) {
      return requestFailed(
        new MissingEntityError('product')
      )
    }

    const { product } = httpRequest.body
    const productId = this.idGenerator.generate();

    const missingParam = this.validateParams(product)
    if (missingParam) {
      return requestFailed(
        new MissingParamError(missingParam)
      )
    }

    if (!this.isValidAmountType(product.amount)) {
      return requestFailed(
        new WrongParamTypeError('amount', 'number')
      )
    }

    if (!this.isValidAmountValue(product.amount)) {
      return requestFailed(
        new WrongParamValueError('amount', 'positive value')
      )
    }
  }

  validateParams(product: any) {
    for(const param of this.requiredParams) {
      if (!product[param]) {
        return param
      }
    }
  }

  isValidAmountType(amount: any) {
    if (typeof amount !== 'number') {
      return false
    }
    return true
  }

  isValidAmountValue(amount: number) {
    if (amount < 0) {
      return false
    }
    return true
  }
}
