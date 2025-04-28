import { Product } from '../../../domain/product/entity/product'
import { CreateProductUseCase } from './create.product.usecase'

const input = {
  id: '1',
  name: 'Product 1',
  price: 100,
}

const product = new Product(input.id, input.name, input.price)

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  }
}

describe('Product create unit tests', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      price: input.price,
    })
  })

  it('should throw an error when product is already registered', async () => {
    const productRepository = MockRepository()
    productRepository.find = jest.fn().mockReturnValue(Promise.resolve(product))
    const usecase = new CreateProductUseCase(productRepository)

    await expect(usecase.execute(input)).rejects.toThrow(
      'Product already exists'
    )
  })
})
