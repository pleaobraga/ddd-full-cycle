import { Product } from '../../../domain/product/entity/product'
import { ProductRepositoryInterface } from '../../../domain/product/repository/product-repository.interface'
import {
  InputUpdateProductDTO,
  OutputUpdateProductDTO,
} from './update.product.dto'

export class UpdateProductUseCase {
  constructor(readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
    const productExists = await this.productRepository.find(input.id)
    if (!productExists) {
      throw new Error('Product does not exists')
    }

    const updatedProduct = new Product(input.id, input.name, input.price)

    await this.productRepository.update(updatedProduct)

    return {
      id: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
    }
  }
}
