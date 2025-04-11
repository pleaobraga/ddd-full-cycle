import { Order } from '../../../../domain/checkout/entity/order'
import { OrderItem } from '../../../../domain/checkout/entity/order-item'
import { OrderRepositoryInterface } from '../../../../domain/checkout/repository/order-repository.interface'
import OrderItemModel from './order-item.model'
import OrderModel from './order.model'

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      )
    } catch (e) {
      console.log('error', e)
      throw new Error('Error on create the order')
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel

    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: ['items'],
        rejectOnEmpty: true,
      })
    } catch {
      throw new Error('Order not found')
    }

    const items = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    )

    return new Order(orderModel.id, orderModel.customer_id, items)
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ['items'],
    })

    return orderModels.map((order) => {
      const items = order.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )

      return new Order(order.id, order.customer_id, items)
    })
  }

  update(entity: Order): Promise<void> {
    throw new Error('Method not implemented')
  }
}
