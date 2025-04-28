import { CustomerFactory } from '../../../domain/customer/factory/customer.factory'
import { Address } from '../../../domain/customer/value-object/address'
import { CustomerListUseCase } from './list.customer.usecase'

const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
const customer1 = CustomerFactory.createWithAddress('Customer 1', address)
const customer2 = CustomerFactory.createWithAddress('Customer 2', address)

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    findById: jest.fn(),
    delete: jest.fn(),
  }
}

describe('Test update customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository()

    const usecase = new CustomerListUseCase(customerRepository)

    const output = await usecase.execute()
    expect(output).toEqual({
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.Address.street,
            number: customer1.Address.number,
            city: customer1.Address.city,
            zip: customer1.Address.zip,
          },
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.Address.street,
            number: customer2.Address.number,
            city: customer2.Address.city,
            zip: customer2.Address.zip,
          },
        },
      ],
    })
  })
})
