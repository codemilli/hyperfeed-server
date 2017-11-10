import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {User} from "../user/user.entity";
import {Link} from "./link.entity";

@Table({
  timestamps: true,
  underscored: true
})
export class Post extends Model<Post> {

  @ForeignKey(() => User)
  @Column
  userId: number

  @ForeignKey(() => Link)
  @Column
  linkId: number

  @Column
  title: string

  @Column
  desc: string

  @Column
  deletedAt: Date

}
