import { EventDispatcher } from '../../@shared/event/event-dispatcher'
import { SendMessageWhenCustomerIsCreated1Handler } from '../event/customer-created/handler/send-message-when-customer-is-created-1'
import { SendMessageWhenCustomerIsCreated2Handler } from '../event/customer-created/handler/send-message-when-customer-is-created-2'
import { SendMesageWhenAddressHasChanged } from '../event/custumer-address-changed/handler/send-mesage-when-address-has-changed'
import { Address } from '../value-object/address'
import { Customer } from './customer'

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'John')
    }).toThrow('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('123', '')
    }).toThrow('Name is required')
  })

  it('should change name', () => {
    // Arrange
    const customer = new Customer('123', 'John')

    // Act
    customer.changeName('Jane')

    // Assert
    expect(customer.name).toBe('Jane')
  })

  it('should activate customer', () => {
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 123, '13330-250', 'São Paulo')
    customer.Address = address

    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1')
      customer.activate()
    }).toThrow('Address is mandatory to activate a customer')
  })

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'Customer 1')

    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1')
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })

  it('should trigger events when customer is created and address is changed', () => {
    const eventDispatcher = new EventDispatcher()

    const handler1 = new SendMessageWhenCustomerIsCreated1Handler()
    const handler2 = new SendMessageWhenCustomerIsCreated2Handler()
    const addressHandler = new SendMesageWhenAddressHasChanged()

    eventDispatcher.register('CustomerCreatedEvent', handler1)
    eventDispatcher.register('CustomerCreatedEvent', handler2)
    eventDispatcher.register('CustomerAddressChangedEvent', addressHandler)

    const customer = Customer.create('123', 'John Doe')
    const address = new Address('Street', 1, '00000', 'City')
    customer.changeAddress(address)

    for (const event of customer.events) {
      eventDispatcher.notify(event)
    }

    customer.clearEvents()
  })
})
