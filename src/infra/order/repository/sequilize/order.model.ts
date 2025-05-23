import {
  Table,
  Model,
  PrimaryKey,
  Column,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript'
import CustomerModel from '../../../customer/repository/sequilize/customer.model'
import OrderItemModel from './order-item.model'

@Table({
  tableName: 'orders',
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[]

  @Column({ allowNull: false })
  declare total: number
}
