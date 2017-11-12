import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {User} from "../user/user.entity";
import {Link} from "../link/link.entity";

@Table
export class Post extends Model<Post> {

  @ForeignKey(() => User)
  @Column
  user_id: number

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Link)
  @Column
  link_id: number

  @BelongsTo(() => Link)
  link: Link

  @Column
  title: string

  @Column
  desc: string
}
