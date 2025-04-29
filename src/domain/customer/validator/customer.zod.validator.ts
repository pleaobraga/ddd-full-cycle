import { z } from 'zod'
import { ValidatorInterface } from '../../@shared/validator/validator.interface'
import { Customer } from '../entity/customer'

export class CustomerZodValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    const customerSchema = z.object({
      id: z.string().min(1, { message: 'Id is required' }),
      name: z.string().min(1, { message: 'Name is required' }),
    })

    try {
      customerSchema.parse({
        id: entity.id,
        name: entity.name,
      })
    } catch (error) {
      const zodError = error as z.ZodError
      zodError.errors.forEach((err) => {
        entity.notification.addError({
          message: err.message,
          context: 'customer',
        })
      })
    }
  }
}
