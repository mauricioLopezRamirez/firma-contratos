'use strict'
const Logger = use('Logger')
const GenerateFuecService = use('App/Services/GenerateFuecService');
const ValidatorFuec = use('App/Validators/Fuec.js');
const generator = require('generate-password');
const QRCode = require('qrcode')
const Helpers = use('Helpers');
const Env = use('Env')
const fs = use('fs');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with fuecs
 */
class FuecController {

  async loadInfoInFuec({ request, view }) {
    const { data } = request.get()
    try {
      return view.render('Documents/fuec', { data: JSON.parse(data) });
    } catch (error) {
      Logger.error('FuecController.loadInfoInFuec', error)
    }
  }

  /**
   * Create/save a new fuec.
   * POST fuecs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const { ...data } = request.all()
      const url = Env.get('APP_URL')
      const nameFuec = (await this.nameFuec()) + '.pdf';
      data.sign = await this.saveImg(data.sign);
      data.nameFuec = nameFuec
      data.urlFuec = `${url}/fuec/${nameFuec}`;
      const fuec = await GenerateFuecService.fuec(data)
      if (fuec) {
        return response.send({ status: true });
      }
      return response.send({ status: false });
    } catch (error) {
      Logger.error('generate', error)
      console.log(error)
    }
  }

  async qr(urlFuec) {
    try {
      const namesImg = generator.generateMultiple(1, {
        length: 20,
        uppercase: false
      });
      const url = 'public/$2y$12$ADh98LfFunIKi8pHOZGPs.5DE4lFv6dSt9qhk4l5jaA6KybIJHLWS/' + namesImg[0] + '.png';
      await QRCode.toFile(url, urlFuec, {
        color: {
          dark: '#00F',
          light: '#0000'
        }
      }, function (err) {
        if (err) throw err
        console.log('done')
      })
      return namesImg[0] + '.png'
    } catch (error) {
      return error
    }
  }


  async nameFuec() {
    const name = generator.generate({
      length: 60,
      numbers: true,
      uppercase: true,
      lowercase: true
    });
    return name
  }

  async saveImg(data) {
    let base64Image = data.split(';base64,').pop();
    const namesImg = generator.generateMultiple(1, {
      length: 20,
      uppercase: false
    });
    const nameFirm = `public/$2y$12$OiqHA3FcNTuzr6sBHF3yOXZeB9a5JtBmEkGOXmqxeiEPui3.J4ii/${namesImg[0]}.png`
    await fs.writeFile(nameFirm, base64Image, { encoding: 'base64' }, function (err) {
      console.log('File created');
    });
    return namesImg[0]
  }

  /**
   * Display a single fuec.
   * GET fuecs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing fuec.
   * GET fuecs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update fuec details.
   * PUT or PATCH fuecs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a fuec with id.
   * DELETE fuecs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = FuecController
