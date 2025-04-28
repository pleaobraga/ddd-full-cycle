import { Product } from '../../../domain/product/entity/product'
import { UpdateProductUseCase } from './update.product.usecase'

const input = {
  id: '1',
  name: 'Product 1 updated',
  price: 100,
}

const product = new Product(input.id, 'Product 1', input.price)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  }
}

describe('Product update unit tests', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository()
    const usecase = new UpdateProductUseCase(productRepository)

    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: product.id,
      name: input.name,
      price: input.price,
    })
  })

  it('should throw an error when product is not registered', async () => {
    const productRepository = MockRepository()
    productRepository.find = jest.fn().mockReturnValue(Promise.resolve(null))
    const usecase = new UpdateProductUseCase(productRepository)

    await expect(usecase.execute(input)).rejects.toThrow(
      'Product does not exists'
    )
  })
})
