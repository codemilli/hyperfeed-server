import {Table, Column, Model, ForeignKey, IsUrl} from 'sequelize-typescript'
import {Post} from "./post.entity";

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
