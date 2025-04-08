import { Address } from './address'

export class Customer {
  _id: string
  _name: string
  _address!: Address
  private _active: boolean = false

  constructor(id: string, name: string) {
    this._id = id
    this._name = name

    this.validate()
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
    if (this._name.length === 0) {
      throw new Error('Name is required')
    }
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  get Address(): Address {
    return this._address
  }

  changeAddress(address: Address) {
    this._address = address
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  set address(address: Address) {
    this._address = address
  }
}
