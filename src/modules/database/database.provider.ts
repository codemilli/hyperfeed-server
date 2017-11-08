import {Sequelize} from 'sequelize-typescript'
import {ENV} from '../../../config/env/development'
import {User} from "../user/user.entity";

export const SequelizeToken = 'SequelizeToken'
export const databaseProviders = [
    {
        provide: SequelizeToken,
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: ENV.DB_HOST,
                port: ENV.DB_PORT,
                username: ENV.DB_USER,
                password: ENV.DB_PASS,
                database: ENV.DB_NAME,
            })
            sequelize.addModels([User])
            await sequelize.sync()
            return sequelize
        }
    }
]
