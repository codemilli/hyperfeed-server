import {Table, Column, Model} from 'sequelize-typescript'

@Table
export class User extends Model<User> {
  @Column
  email: string

  @Column
  username: string

  @Column
  password: string

  @Column
  password_reset_token: string

  @Column
  password_reset_expires: string

  @Column
  verified: boolean
}
