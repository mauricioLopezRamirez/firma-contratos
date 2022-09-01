'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContratosSchema extends Schema {
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

module.exports = ContratosSchema
