import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../customer/repository/sequilize/customer.model'
import { CustomerRepository } from '../../../customer/repository/sequilize/customer.repository'
import { Customer } from '../../../../domain/customer/entity/customer'
import OrderModel from './order.model'
import OrderItemModel from './order-item.model'
import { ProductModel } from '../../../product/repository/sequlize/product.model'
import { ProductRepository } from '../../../product/repository/sequlize/product.repository'
import { Product } from '../../../../domain/product/entity/product'
import { OrderItem } from '../../../../domain/checkout/entity/order-item'
import { Order } from '../../../../domain/checkout/entity/order'
import { Address } from '../../../../domain/customer/value-object/address'
import { OrderRepository } from './order.repository'

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    })
  })

  it('should find a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    const foundOrder = await orderRepository.find('123')

    expect(orderModel.toJSON()).toStrictEqual({
      id: foundOrder.id,
      customer_id: foundOrder.customerId,
      items: [
        {
          id: foundOrder.items[0].id,
          name: foundOrder.items[0].name,
          price: foundOrder.items[0].price,
          quantity: foundOrder.items[0].quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
      total: foundOrder.total(),
    })
  })

  it.only('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const orderRepository = new OrderRepository()

    const order1 = new Order('1', '123', [orderItem])
    await orderRepository.create(order1)

    const order2 = new Order('2', '123', [orderItem])
    await orderRepository.create(order2)

    // const orders = [order1, order2]

    // const foundOrders = await orderRepository.findAll()

    // expect(orders).toEqual(foundOrders)
  })
})
