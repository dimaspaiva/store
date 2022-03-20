import { CreateProductController } from './CreateProduct'
import { MissingParamError } from '../errors/MissingParam'

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
})
