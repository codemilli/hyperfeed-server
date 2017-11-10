import {Post} from './post.entity'

export const PostsRepository = 'PostsRepository'
export const postsProviders = [
  {
    provide: PostsRepository,
    useValue: Post
  }
]
