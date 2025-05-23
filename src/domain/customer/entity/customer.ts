import { Address } from '../value-object/address'
import { Entity } from '../../@shared/entity/entity.abstact'
import { NotificationError } from '../../@shared/notification/notification.error'
import { CustomerValidatorFactory } from '../factory/customer.validator.factory'

export class Customer extends Entity {
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    super()
    this._id = id
    this._name = name
    this.validate()
  }

  static create(id: string, name: string) {
    const customer = new Customer(id, name)
    return customer
  }

  get name(): string {
    return this._name
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  validate() {
    CustomerValidatorFactory.create().validate(this)

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errorsList)
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

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }

  set Address(address: Address) {
    this._address = address
  }
}
