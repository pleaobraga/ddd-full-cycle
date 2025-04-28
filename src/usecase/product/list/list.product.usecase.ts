/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductRepositoryInterface } from '../../../domain/product/repository/product-repository.interface'
import { InputListProductDTO, OutputListProductDTO } from './list.product.dto'

export class ListProductUseCase {
  constructor(readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
    const product = await this.productRepository.findAll()

    const products = product.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }))

    return {
      products,
    }
  }
}
