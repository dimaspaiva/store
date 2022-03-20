import { CreateProductController } from './CreateProduct'
import { MissingParamError } from '../errors/MissingParam'
import { WrongParamTypeError } from '../errors/WrongParamType'
import { MissingEntityError } from '../errors/MissingEntity'
import { WrongParamValueError } from '../errors/WrongParamValue'
import { IdGenerator } from '../protocols/idGenerator'
import { StoreProduct, StoreProductModel } from '../../domain/useCases/storeProduct'
import { ProductModel } from '../../domain/models/product'

const testProduct = {
  name: 'Product Name',
  amount: 10,
  description: 'Product description'
}

const makeIdGenerator = () => {
  class IdGeneratorStub implements IdGenerator {
    generate(): string {
      return 'generated id'
    }
  }

  return new IdGeneratorStub
}

const makeStoreProduct = () => {
  class StoreProductStub implements StoreProduct {
    store(product: StoreProductModel): ProductModel {
      return product
    }
  }

  return new StoreProductStub()
}

const makeSut = () => {
  const idGenerator = makeIdGenerator()
  const storeProduct = makeStoreProduct()
  const sut = new CreateProductController(idGenerator, storeProduct)

  return {
    sut,
    idGenerator,
    storeProduct
  }
}

describe('Create Product', () => {
  it('Should return 400 if product has no name', async () => {
    const { sut } = makeSut()
    const {name, ...product} = testProduct

    const response = await sut.handle({ body: { product } })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name'))
  })

  it('Should return 400 if product has no description', async () => {
    const { sut } = makeSut()
    const {description, ...product} = testProduct

    const response = await sut.handle({ body: { product } })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('description'))
  })

  it('Should return 400 if product amount type is not number', async () => {
    const { sut } = makeSut()
    const product = { ...testProduct, amount: '1'}

    const response = await sut.handle({ body: { product } })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new WrongParamTypeError('amount', 'number'))
  })

  it('Should return 400 if product amount type is missing', async () => {
    const { sut } = makeSut()
    const { amount, ...product } = testProduct

    const response = await sut.handle({ body: { product } })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('amount'))
  })

  it('Should return 400 if product amount is negative', async () => {
    const { sut } = makeSut()
    const product = { ...testProduct, amount: -1 }

    const response = await sut.handle({ body: { product } })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new WrongParamValueError('amount', 'positive value'))
  })

  it('Should return 400 if product is empty or missing', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({ body: {} })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingEntityError('product'))
  })

  it('Should call generate id once when product is created', async () => {
    const { sut, idGenerator } = makeSut()
    const idGeneratorSpy = jest.spyOn(idGenerator, 'generate')
    const product = testProduct

    await sut.handle({body: { product } })

    expect(idGeneratorSpy).toHaveBeenCalled()
  })

  it('Should call storeProduct with correct values', async () => {
    const { sut, storeProduct } = makeSut()
    const storeProductSpy = jest.spyOn(storeProduct, 'store')
    const product = testProduct

    await sut.handle({body: { product }})
    expect(storeProductSpy).toHaveBeenCalledWith({...product, id: 'generated id'}) 
  })
})
