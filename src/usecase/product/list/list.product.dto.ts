export type InputListProductDTO = void

type Product = {
  id: string
  name: string
  price: number
}

export interface OutputListProductDTO {
  products: Product[]
}
