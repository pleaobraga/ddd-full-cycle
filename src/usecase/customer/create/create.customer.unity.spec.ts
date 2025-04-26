import { Customer } from '../../../domain/customer/entity/customer'
import { Address } from '../../../domain/customer/value-object/address'
import { CustomerCreateUseCase } from './create.customer.usecase'

const customer = new Customer('123', 'Customer 1')
const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
customer.changeAddress(address)

const input = {
  name: 'Customer 1',
  address: {
    street: 'Street 1',
    number: 1,
    city: 'City 1',
    zip: 'Zipcode 1',
  },
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  }
}

describe('Test create a new customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository()

    await customerRepository.create(customer)

    const usecase = new CustomerCreateUseCase(customerRepository)

    const output = await usecase.execute(input)
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
      },
    })
  })

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockRepository()

    await customerRepository.create(customer)

    const usecase = new CustomerCreateUseCase(customerRepository)

    input.name = ''

    await expect(usecase.execute(input)).rejects.toThrow('Name is required')
  })

  it('should throw an error when Street is missing', async () => {
    const customerRepository = MockRepository()

    await customerRepository.create(customer)

    const usecase = new CustomerCreateUseCase(customerRepository)

    input.address.street = ''

    await expect(usecase.execute(input)).rejects.toThrow('Street is required')
  })
})
