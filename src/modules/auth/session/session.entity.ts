import {Table, Column, Model, Unique, PrimaryKey, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {User} from "../../user/user.entity";

@Table
export class Session extends Model<Session> {
  @PrimaryKey
  @Unique
  @Column
  sid: string

  @ForeignKey(() => User)
  @Column
  user_id: number

  @BelongsTo(() => User)
  user: User

  @Column
  expires: Date

  @Column({
    type: DataType.TEXT
  })
  data: string
}
