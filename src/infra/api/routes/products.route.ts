import express from 'express'
import { ProductRepository } from '../../product/repository/sequlize/product.repository'
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase'
import { ListProductUseCase } from '../../../usecase/product/list/list.product.usecase'

export const productRoute = express.Router()

productRoute.post('/', async (req, res) => {
  const usecase = new CreateProductUseCase(new ProductRepository())

  try {
    const productDTO = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    }
    const output = await usecase.execute(productDTO)
    res.status(200).json(output)
  } catch (error) {
    res.status(500).json({ error })
  }
})

productRoute.get('/', async (req, res) => {
  const usecase = new ListProductUseCase(new ProductRepository())

  try {
    const output = await usecase.execute()
    res.status(200).json(output)
  } catch (error) {
    res.status(500).json({ error })
  }
})
