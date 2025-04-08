import { Customer } from './entity/customer/customer'
import { Order } from './entity/checkout/order'
import { OrderItem } from './entity/checkout/order-item'
import { Address } from './entity/customer/value-object/address'

const customer = new Customer('123', 'Pedro')
const address = new Address('Rua 1', 2, '12345-678', 'Belo Horizonte')
customer.changeAddress(address)
customer.activate()

// const item1 = new OrderItem('1', 'item 1', 10, )
// const item2 = new OrderItem('2', 'item 2', 15)
// const order = new Order('1', '123', [item1, item2])

// console.log('order', order)
