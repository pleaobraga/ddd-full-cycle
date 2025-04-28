/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'
import {
  InputListCustomerDTO,
  OutputListCustomerDTO,
} from './list.customer.dto'

export class CustomerListUseCase {
  constructor(readonly customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customer = await this.customerRepository.findAll()
    const customers = customer.map((customer) => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        city: customer.Address.city,
        zip: customer.Address.zip,
      },
    }))

    return {
      customers,
    }
  }
}
