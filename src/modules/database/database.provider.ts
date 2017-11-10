import {Sequelize} from 'sequelize-typescript'
import {ENV} from '../../../config/env/development'
import {User} from "../user/user.entity";

const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASS
})

export const SequelizeToken = 'SequelizeToken'
export const databaseProviders = [
  {
    provide: SequelizeToken,
    useFactory: async () => {
      await new Promise((resolve) => connection.query(`CREATE DATABASE ${ENV.DB_NAME}`, resolve))
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: ENV.DB_HOST,
        port: ENV.DB_PORT,
        username: ENV.DB_USER,
        password: ENV.DB_PASS,
        database: ENV.DB_NAME,
        define: {
          underscored: true,
          charset: 'utf8',
          collate: 'utf8_general_ci',
          paranoid: true,
          timestamps: true
        }
      })
      sequelize.addModels([User])
      await sequelize.sync({alter: true, force: true})
      return sequelize
    }
  }
]
