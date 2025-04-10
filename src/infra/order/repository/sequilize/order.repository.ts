import { Order } from '../../../../domain/checkout/entity/order'
import OrderItemModel from './order-item.model'
import OrderModel from './order.model'

export class OrderRepository {
  //  implements OrderRepositoryInterface

  async create(entity: Order): Promise<void> {
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
  }

  // find(id: string): Promise<Order> {
  //   let orderModel

  //   try {
  //     orderModel = await OrderModel.findOne({
  //       where: {
  //         id,
  //       },
  //       include: ['items'],
  //       rejectOnEmpty: true,
  //     })
  //   } catch {
  //     throw new Error('Customer not found')
  //   }
  // }

  // findAll(): Promise<Order[]> {
  //   throw new Error('Method not implemented')
  // }

  // update(entity: Order): Promise<void> {
  //   throw new Error('Method not implemented')
  // }
}
