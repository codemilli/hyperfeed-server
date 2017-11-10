import {Table, Column, Model, IsUrl, HasMany} from 'sequelize-typescript'
import {Post} from "../post/post.entity";

@Table({
  timestamps: true,
  underscored: true
})
export class Link extends Model<Link> {
  @HasMany(() => Post)
  @Column
  posts: Post[]

  @IsUrl
  @Column
  url: string
}
