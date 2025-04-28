import { Product } from '../../../domain/product/entity/product'
import { FindProductUseCase } from './find.product.usecase'

const product = new Product('1', 'Product 1', 100)

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

describe('Product find unit tests', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository()
    const usecase = new FindProductUseCase(productRepository)

    const input = {
      id: '1',
    }

    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
  })

  it('should throw an error when product is not found', async () => {
    const productRepository = MockRepository()
    const usecase = new FindProductUseCase(productRepository)

    productRepository.find.mockRejectedValue(new Error('Product not found'))

    const input = {
      id: '2',
    }

    await expect(usecase.execute(input)).rejects.toThrow('Product not found')
  })
})
