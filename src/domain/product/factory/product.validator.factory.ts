import { ValidatorInterface } from '../../@shared/validator/validator.interface'
import { Product } from '../entity/product'
import { ProductZodValidator } from '../validator/product.zod.validator'

export class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductZodValidator()
  }
}
