import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../../../infra/product/repository/sequlize/product.model'
import { ProductRepository } from '../../../infra/product/repository/sequlize/product.repository'
import { Product } from '../../../domain/product/entity/product'
import { CreateProductUseCase } from './create.product.usecase'

let sequelize: Sequelize

const input = {
  id: '1',
  name: 'Product 1',
  price: 100,
}

const product = new Product(input.id, input.name, input.price)

describe('Integration Test Create product use case', () => {
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

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      id: '1',
      name: 'Product 1',
      price: 100,
    }

    const output = await usecase.execute(input)

    expect(output).toEqual(product)
  })

  it('should throw an error when product is already registered', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)

    await productRepository.create(product)

    await expect(usecase.execute(input)).rejects.toThrow(
      'Product already exists'
    )
  })
})
