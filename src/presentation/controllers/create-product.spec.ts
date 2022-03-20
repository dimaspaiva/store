import { CreateProductController } from './CreateProduct'
import { MissingParamError } from '../errors/MissingParam'
import { WrongParamTypeError } from '../errors/WrongParamType'
import { MissingEntityError } from '../errors/MissingEntity'

const testProduct = {
  name: 'Product Name',
  amount: 10,
  description: 'Product description'
}


const makeSut = () => {
  const sut = new CreateProductController()

  return {
    sut
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

  it('Should return 400 if product is empty or missing', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({ body: {} })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingEntityError('product'))
  })
})
