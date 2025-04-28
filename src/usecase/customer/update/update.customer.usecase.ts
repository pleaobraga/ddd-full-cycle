import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'
import { Address } from '../../../domain/customer/value-object/address'
import {
  InputUpdateustomerDTO,
  OutputUpdateCustomerDTO,
} from './update.customer.dto'

export class CustomerUpdateUseCase {
  constructor(readonly customerRepository: CustomerRepositoryInterface) {}

  async execute(
    input: InputUpdateustomerDTO
  ): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.customerRepository.find(input.id)
    customer.changeName(input.name)
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    )
    await this.customerRepository.update(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        city: customer.Address.city,
        zip: customer.Address.zip,
      },
    }
  }
}
