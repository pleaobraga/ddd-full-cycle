import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E tests for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: '123 Main St',
          number: 123,
          zip: '12345',
          city: 'New York',
        },
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      address: {
        street: '123 Main St',
        number: 123,
        zip: '12345',
        city: 'New York',
      },
    })
  })

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'John Doe',
    })

    expect(response.status).toBe(500)
  })

  it('should list all customers', async () => {
    const response1 = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: '123 Main St',
          number: 123,
          zip: '12345',
          city: 'New York',
        },
      })

    expect(response1.status).toBe(200)

    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'Jane',
        address: {
          street: '123 Main St',
          number: 125,
          zip: '12346',
          city: 'New York',
        },
      })
    expect(response2.status).toBe(200)

    const listResponse = await request(app).get('/customer').send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)
    expect(listResponse.body.customers[0]).toEqual({
      id: expect.any(String),
      name: response1.body.name,
      address: {
        street: response1.body.address.street,
        number: response1.body.address.number,
        zip: response1.body.address.zip,
        city: response1.body.address.city,
      },
    })
    expect(listResponse.body.customers[1]).toEqual({
      id: expect.any(String),
      name: response2.body.name,
      address: {
        street: response2.body.address.street,
        number: response2.body.address.number,
        zip: response2.body.address.zip,
        city: response2.body.address.city,
      },
    })
  })
})
