import { Order } from '../entity/checkout/order'
import { OrderItem } from '../entity/checkout/order-item'
import { Customer } from '../entity/customer/customer'
import { v4 as uuid } from 'uuid'

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item')
    }
    const order = new Order(uuid(), customer.id, items)
    customer.addRewardPoints(order.total() / 2)
    return order
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0)
  }
}
