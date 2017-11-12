import {Table, Column, Model, IsUrl, Unique} from 'sequelize-typescript'

@Table
export class Link extends Model<Link> {
  @IsUrl
  @Unique
  @Column
  url: string
}
