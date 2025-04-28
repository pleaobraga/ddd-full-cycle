import { Product } from '../../../domain/product/entity/product'
import { ListProductUseCase } from './list.product.usecase'

const product1 = new Product('1', 'Product 1', 100)
const product2 = new Product('2', 'Product 2', 100)

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    findById: jest.fn(),
    delete: jest.fn(),
  }
}

describe('Product list unit tests', () => {
  it('should list a product', async () => {
    const productRepository = MockRepository()
    const usecase = new ListProductUseCase(productRepository)

    const output = await usecase.execute()

    expect(output).toEqual({
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ],
    })
  })
})
