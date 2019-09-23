'use strict'
const config = require('../config/config.js')
const sysconfig = require('../config')
const Umzug = require('umzug')
const db = require('../models')
module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(sysconfig)
    console.log(config)
    const umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize: db.sequelize
      },
      migrations: {
        path: '.'
      }
    })
    umzug.storage.model.destroy({
      where: {},
      truncate: true
    })
    return queryInterface.createTable('users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
