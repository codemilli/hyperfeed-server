export class CreatePostDto {
  readonly url: string
  readonly user_id: number | string
  readonly title: string
  readonly desc: string
}
