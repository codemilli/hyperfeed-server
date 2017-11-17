import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
import * as compress from 'compression'
import {NestFactory} from '@nestjs/core'
import {ApplicationModule} from './modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule)
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(cors())
  app.use(compress())
  await app.listen(3100)
}

bootstrap()
