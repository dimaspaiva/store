import { CreateProductController } from './CreateProduct'
import { MissingParamError } from '../errors/MissingParam'

describe('Create Product', () => {
  it('Should return 400 if product has no name', async () => {
    const sut = new CreateProductController()
    const product = {
      amount: 10,
      description: 'Product description'
    }

    const response = await sut.handle({ body: { product } })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name'))
  })
})
