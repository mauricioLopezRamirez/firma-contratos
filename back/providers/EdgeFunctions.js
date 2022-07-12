'use strict';

const { ServiceProvider } = require('@adonisjs/fold');
const Moment = require('moment');

class EdgeFunctions extends ServiceProvider {
  async boot() {
    const View = this.app.use('Adonis/Src/View');
    View.global('toUpperCase', text => text ? text.toUpperCase() : '');
    View.global('getDay', date => Moment(new Date()).format("DD"));
    View.global('getDate', date => new Date().toLocaleString('es'));
    View.global('getMonth', date => Moment(new Date()).format("MM"));
    View.global('getYear', date => (new Date()).getFullYear());
    View.global('shortDate', date => new Date(date).toLocaleString());
    View.global('replaceNull', string => string == 'null' || string == 'nul' || string == null ? '' : string);
    View.global('replaceNullText', string => string.replace('null', ''));
    View.global('moneyCop', money => money ? new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(money) : '');
  }
}

module.exports = EdgeFunctions;
