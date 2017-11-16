import {Table, Column, Model, Unique, PrimaryKey, DataType, ForeignKey, BelongsTo, Default} from 'sequelize-typescript'
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

  @Default(0)
  @Column
  refresh_times: number

  @Column
  expires: Date

  @Column({
    type: DataType.TEXT
  })
  data: string
}
