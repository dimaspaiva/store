import { StoreProduct } from '../../domain/useCases/storeProduct'
import { MissingEntityError } from '../errors/MissingEntity'
import { MissingParamError } from '../errors/MissingParam'
import { ServerError } from '../errors/ServerErrror'
import { WrongParamTypeError } from '../errors/WrongParamType'
import { WrongParamValueError } from '../errors/WrongParamValue'
import { requestFailed } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HTTPRequest, HTTPResponse } from '../protocols/http'
import { IdGenerator } from '../protocols/idGenerator'

export class CreateProductController implements Controller {
  private readonly idGenerator:  IdGenerator
  private readonly storeProduct: StoreProduct
  private requiredParams = ['name', 'description', 'amount']

  constructor (idGenerator: IdGenerator, storeProduct: StoreProduct) {
    this.idGenerator =  idGenerator
    this.storeProduct = storeProduct
  }

  async handle (httpRequest: HTTPRequest): Promise<HTTPResponse> {    
    if (!httpRequest.body.product) {
      return requestFailed(
        new MissingEntityError('product')
      )
    }

    const { product } = httpRequest.body
    
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
    
    try {
      const productId = this.idGenerator.generate();
      const newProduct = this.storeProduct.store({
        ...product,
        id: productId
      })
    } catch (error) {
      switch (error.message) {
        case 'store-product':
          return {
            statusCode: 500,
            body: new ServerError('Failed to store a product')
          }
        case 'generate-id':
          return {
            statusCode: 500,
            body: new ServerError('Failed to genereta a product id')
          } 
        default:
          return {
            statusCode: 500,
            body: new ServerError('Unknown')
          } 
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
