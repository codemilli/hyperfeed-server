import {User} from './user.entity'

export const UsersRepository = 'UsersRepository'
export const usersProviders = [
  {
    provide: UsersRepository,
    useValue: User
  }
]
