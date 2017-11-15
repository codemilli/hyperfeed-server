import {Session} from "./session.entity";

export const SessionsRepository = 'SessionsRepository'
export const sessionProviders = [
  {
    provide: SessionsRepository,
    useValue: Session
  }
]
