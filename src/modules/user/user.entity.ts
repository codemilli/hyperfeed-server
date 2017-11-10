import {Table, Column, Model} from 'sequelize-typescript'

@Table({
  timestamps: true
})
export class User extends Model<User> {
  @Column
  email: string
  @Column
  username: string
  @Column
  password: string
  @Column
  passwordResetToken: string
  @Column
  passwordResetExpires: string
  @Column
  verified: boolean
}
