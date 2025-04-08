import { Order } from '../entity/checkout/order'
import { OrderItem } from '../entity/checkout/order-item'
import { OrderService } from './order.service'

describe('Order Service unit tests', () => {
  it('should get total of all orders', () => {
    const item1 = new OrderItem('1', 'item1', 150, 'p1', 2)
    const item2 = new OrderItem('2', 'item2', 100, 'p2', 2)

    const order1 = new Order('1', 'c1', [item1])
    const order2 = new Order('2', 'c1', [item2])

    const total = OrderService.total([order1, order2])

    expect(total).toBe(500)
  })
})
