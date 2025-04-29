import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

@Table({
  tableName: 'products',
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  declare id: string

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare price: number
}
