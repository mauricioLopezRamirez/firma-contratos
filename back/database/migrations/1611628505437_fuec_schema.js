'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuecSchema extends Schema {
  up () {
    this.create('fuecs', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('fuecs')
  }
}

module.exports = FuecSchema
