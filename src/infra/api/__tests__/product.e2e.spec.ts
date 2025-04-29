import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E tests for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      id: '123',
      name: 'Product 1',
      price: 100,
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: '123',
      name: 'Product 1',
      price: 100,
    })
  })

  it('should not create a product', async () => {
    const response = await request(app).post('/customer').send({
      name: 'product 1',
    })

    expect(response.status).toBe(500)
  })

  it('should list all customers', async () => {
    const response1 = await request(app).post('/product').send({
      id: '1',
      name: 'Product 1',
      price: 100,
    })

    expect(response1.status).toBe(200)

    const response2 = await request(app).post('/product').send({
      id: '2',
      name: 'Product 2',
      price: 200,
    })
    expect(response2.status).toBe(200)

    const listResponse = await request(app).get('/product').send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.products.length).toBe(2)
    expect(listResponse.body.products[0]).toEqual({
      id: response1.body.id,
      name: response1.body.name,
      price: response1.body.price,
    })
    expect(listResponse.body.products[1]).toEqual({
      id: response2.body.id,
      name: response2.body.name,
      price: response2.body.price,
    })
  })
})
