import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../../../infra/product/repository/sequlize/product.model'
import { ProductRepository } from '../../../infra/product/repository/sequlize/product.repository'
import { Product } from '../../../domain/product/entity/product'
import { ListProductUseCase } from './list.product.usecase'

let sequelize: Sequelize

describe('Integration Test list product use case', () => {
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

  it('should list all products', async () => {
    const product1 = new Product('1', 'Product 1', 100)
    const product2 = new Product('2', 'Product 2', 200)
    const productRepository = new ProductRepository()

    await productRepository.create(product1)
    await productRepository.create(product2)

    const usecase = new ListProductUseCase(productRepository)

    const result = await usecase.execute()
    expect(result).toEqual({
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
