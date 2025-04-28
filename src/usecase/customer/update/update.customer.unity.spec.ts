import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/value-object/address'
import { CustomerUpdateUseCase } from './update.customer.usecase'

const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
const customer = CustomerFactory.createWithAddress('Customer 1', address)

const input = {
  id: customer.id,
  name: 'Customer Updated',
  address: {
    street: 'Street 1',
    number: 1,
    city: 'City 1',
    zip: 'Zipcode 1',
  },
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  }
}

describe('Test update customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository()

    const usecase = new CustomerUpdateUseCase(customerRepository)

    const output = await usecase.execute(input)
    expect(output).toEqual({
      id: customer.id,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
      },
    })
  })
})
