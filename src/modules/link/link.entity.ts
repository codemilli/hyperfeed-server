import {Table, Column, Model, IsUrl, HasMany, Unique, PrimaryKey, AutoIncrement} from 'sequelize-typescript'
import {Post} from "../post/post.entity";

@Table
export class Link extends Model<Link> {
  // @HasMany(() => Post)
  // @Column
  // posts: Post[]

  @IsUrl
  @Unique
  @Column
  url: string
}
