export interface IAuthToken {
  readonly sid: string
  readonly user_id: number
  readonly useragent: string
  readonly refreshed_times: number
  readonly exp: number
}
