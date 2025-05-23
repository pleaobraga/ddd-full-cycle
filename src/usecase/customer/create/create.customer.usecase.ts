import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'
import { Address } from '../../../domain/customer/value-object/address'
import {
  InputCreateCustomerDTO,
  OutputCreateCustomerDTO,
} from './create.customer.dto'

export class CustomerCreateUseCase {
  constructor(readonly customerRepository: CustomerRepositoryInterface) {}

  async execute(
    input: InputCreateCustomerDTO
  ): Promise<OutputCreateCustomerDTO> {
    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.zip,
      input.address.city
    )
    const customer = CustomerFactory.createWithAddress(input.name, address)

    await this.customerRepository.create(customer)

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
