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
})
