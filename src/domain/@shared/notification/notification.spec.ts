import { Notification } from './notification'

describe('Notification', () => {
  it('should create errors', () => {
    const notification = new Notification()
    const error = {
      message: 'Error message',
      context: 'customer',
    }

    notification.addError(error)

    expect(notification.messages('customer')).toBe('customer: Error message')

    const error2 = {
      message: 'Error message2',
      context: 'customer',
    }

    notification.addError(error2)

    expect(notification.messages('customer')).toBe(
      'customer: Error message, customer: Error message2'
    )

    const error3 = {
      message: 'Error message',
      context: 'order',
    }

    notification.addError(error3)

    expect(notification.messages('customer')).toBe(
      'customer: Error message, customer: Error message2'
    )
    expect(notification.messages('order')).toBe('order: Error message')

    expect(notification.messages()).toBe(
      'customer: Error message, customer: Error message2, order: Error message'
    )
  })
})
