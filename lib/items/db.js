import Sequelize from 'sequelize'
import _ from 'lodash'
const Faker = require('faker') 

import Creds from '../../.credentials'

console.log(Creds.database.user)

const Conn = new Sequelize(
  Creds.database.name, // database name
  Creds.database.user, //username
  Creds.database.pwd, //password
  {
    dialect: Creds.database.dialect,
    host: Creds.database.host
  }
)

const Item = Conn.define('item', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// relationships

// sync
Conn.sync({force: true})
  .then(() => {
    //create test records
    _.times(10, () => {
      console.log("random:" + Faker.random.uuid())

      return Item.create({
        id: Faker.random.uuid(),
        name: Faker.commerce.productName()
      })
    })
  })