'use strict'
const User = use('App/Models/User');

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    await User.create({
      username: 'fuec',
      email: 'pruebas@fuec.com',
      password: 'pruebas'

    })
  }
}

module.exports = UserSeeder
