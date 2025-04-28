import { Product } from '../../../domain/product/entity/product'
import { ProductRepositoryInterface } from '../../../domain/product/repository/product-repository.interface'
import {
  InputCreateProductDTO,
  OutputCreateProductDTO,
} from './create.product.dto'

export class CreateProductUseCase {
  constructor(readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const productExists = await this.productRepository.find(input.id)
    if (productExists) {
      throw new Error('Product already exists')
    }

    const newProduct = new Product(input.id, input.name, input.price)

    await this.productRepository.create(newProduct)

    return {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
    }
  }
}
