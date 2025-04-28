import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../../../infra/product/repository/sequlize/product.model'
import { ProductRepository } from '../../../infra/product/repository/sequlize/product.repository'
import { Product } from '../../../domain/product/entity/product'
import { FindProductUseCase } from './find.product.usecase'

let sequelize: Sequelize

describe('Integration Test find product use case', () => {
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a product', async () => {
    const product = new Product('1', 'Product 1', 100)
    const productRepository = new ProductRepository()

    await productRepository.create(product)

    const input = {
      id: '1',
    }

    const usecase = new FindProductUseCase(productRepository)

    const result = await usecase.execute(input)
    expect(result).toEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
  })

  it('should throw an error when product is not found', async () => {
    const productRepository = new ProductRepository()
    const usecase = new FindProductUseCase(productRepository)

    const input = {
      id: '2',
    }

    await expect(usecase.execute(input)).rejects.toThrow('Product not found')
  })
})
