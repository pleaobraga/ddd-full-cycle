import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infra/customer/repository/sequilize/customer.model'
import { CustomerRepository } from '../../../infra/customer/repository/sequilize/customer.repository'
import { Customer } from '../../../domain/customer/entity/customer'
import { Address } from '../../../domain/customer/value-object/address'
import { CustomerFindUseCase } from './find.customer.usecase'

let sequelize: Sequelize

describe('Test find customer use case', () => {
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a customer', async () => {
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)

    const customerRepository = new CustomerRepository()

    await customerRepository.create(customer)

    const input = {
      id: '123',
    }

    const usecase = new CustomerFindUseCase(customerRepository)

    const result = await usecase.execute(input)
    expect(result).toEqual({
      id: '123',
      name: 'Customer 1',
      address: {
        street: 'Street 1',
        number: 1,
        city: 'City 1',
        zip: 'Zipcode 1',
      },
    })
  })
})
