import express from 'express'
import { CustomerRepository } from '../../customer/repository/sequilize/customer.repository'
import { CustomerCreateUseCase } from '../../../usecase/customer/create/create.customer.usecase'

export const customerRoute = express.Router()

customerRoute.post('/', async (req, res) => {
  const usecase = new CustomerCreateUseCase(new CustomerRepository())

  try {
    const customerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      },
    }
    const output = await usecase.execute(customerDTO)
    res.status(200).json(output)
  } catch (error) {
    res.status(500).json({ error })
  }
})
