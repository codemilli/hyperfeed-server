import {Table, Column, Model, Unique, PrimaryKey, DataType} from 'sequelize-typescript'

@Table
export class Session extends Model<Session> {
  @PrimaryKey
  @Unique
  @Column
  sid: string

  @Column
  user_id: number

  @Column
  expires: string

  @Column({
    type: DataType.TEXT
  })
  data: string
}
