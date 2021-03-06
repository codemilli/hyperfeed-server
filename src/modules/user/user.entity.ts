import {Table, Column, Model, Unique, Default, DataType, DefaultScope, Scopes} from 'sequelize-typescript'

@DefaultScope({
  attributes: ['id', 'email', 'username']
})
@Scopes({
  full: {}
})
@Table
export class User extends Model<User> {
  @Unique
  @Column
  email: string

  @Unique
  @Column
  username: string

  @Default('user') // admin
  @Column
  role: string

  @Column
  password: string

  @Column({
    type: DataType.TEXT,
  })
  secret: string

  @Column({
    type: DataType.TEXT
  })
  password_reset_token: string

  @Column
  password_reset_expires: Date

  @Default(false)
  @Column
  verified: boolean
}
