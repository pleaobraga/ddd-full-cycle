import { OrderItem } from './order-item'

export class Order {
  _id: string
  _customerId: string
  _items: OrderItem[] = []

  constructor(id: string, costumerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = costumerId
    this._items = items
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item._price, 0)
  }
}
