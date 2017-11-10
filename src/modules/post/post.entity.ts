import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {User} from "../user/user.entity";
import {Link} from "../link/link.entity";

@Table
export class Post extends Model<Post> {

  @ForeignKey(() => User)
  @Column
  user_id: number

  @ForeignKey(() => Link)
  @Column
  link_id: number

  @Column
  title: string

  @Column
  desc: string
}
