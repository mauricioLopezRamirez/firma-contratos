'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractsSchema extends Schema {
  up () {
    this.create('contracts', (table) => {
      table.increments()
      table.json('data')
      table.timestamps()
    })
  }

  down () {
    this.drop('contracts')
  }
}

module.exports = ContractsSchema
