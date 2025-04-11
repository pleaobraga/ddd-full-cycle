import { Sequelize } from 'sequelize-typescript'
import CustomerModel from './customer.model'
import { Customer } from '../../../../domain/customer/entity/customer'
import { Address } from '../../../../domain/customer/value-object/address'
import { CustomerRepository } from './customer.repository'

let sequelize: Sequelize
describe('Customer repository test', () => {
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

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.Address = address
    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    })
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.Address = address
    await customerRepository.create(customer)

    customer.changeName('Customer 2')
    await customerRepository.update(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    })
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.Address = address
    await customerRepository.create(customer)
    customer.clearEvents()

    const customerResult = await customerRepository.find(customer.id)

    expect(customerResult.id).toBe(customer.id)
    expect(customerResult.name).toBe(customer.name)
    expect(customerResult.Address.street).toBe(customer.Address.street)
    expect(customerResult.Address.number).toBe(customer.Address.number)
  })

  it('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository()

    expect(async () => {
      await customerRepository.find('456ABC')
    }).rejects.toThrow('Customer not found')
  })

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository()
    const customer1 = new Customer('123', 'Customer 1')
    const address1 = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer1.Address = address1
    customer1.addRewardPoints(10)
    customer1.activate()

    const customer2 = new Customer('456', 'Customer 2')
    const address2 = new Address('Street 2', 2, 'Zipcode 2', 'City 2')
    customer2.Address = address2
    customer2.addRewardPoints(20)

    await customerRepository.create(customer1)
    customer1.clearEvents()
    await customerRepository.create(customer2)
    customer2.clearEvents()

    const customers = await customerRepository.findAll()

    expect(customers).toHaveLength(2)
    expect(customers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: '123', _name: 'Customer 1' }),
        expect.objectContaining({ _id: '456', _name: 'Customer 2' }),
      ])
    )
  })
})
