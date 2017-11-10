import {Link} from './link.entity'

export const LinksRepository = 'LinksRepository'
export const linksProviders = [
  {
    provide: LinksRepository,
    useValue: Link
  }
]
