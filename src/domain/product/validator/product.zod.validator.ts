import { z } from 'zod'
import { ValidatorInterface } from '../../@shared/validator/validator.interface'
import { Product } from '../entity/product'

export class ProductZodValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    const productSchema = z.object({
      id: z.string().min(1, { message: 'Id is required' }),
      name: z.string().min(1, { message: 'Name is required' }),
      price: z.number().min(0, { message: 'Price must be greater than zero' }),
    })

    try {
      productSchema.parse({
        id: entity.id,
        name: entity.name,
        price: entity.price,
      })
    } catch (error) {
      const zodError = error as z.ZodError
      zodError.errors.forEach((err) => {
        entity.notification.addError({
          message: err.message,
          context: 'product',
        })
      })
    }
  }
}
