import { ValidatorInterface } from '../../@shared/validator/validator.interface'
import { Customer } from '../entity/customer'
import { CustomerZodValidator } from '../validator/customer.zod.validator'

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerZodValidator()
  }
}
