'use strict'
const Logger = use('Logger')
const GenerateFuecService = use('App/Services/GenerateFuecService');
const ValidatorFuec = use('App/Validators/Fuec.js');
const generator = require('generate-password');
const contrato = use('App/Models/Contract');
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
    const { id } = request.get()
    try {
      const obj_contrato = await contrato.find(id);
      const data = JSON.parse(obj_contrato.toJSON().data);
      let templateName = '';
      switch (data.colegio) {
        case 'SAN LUIS GONZAGA':
          templateName = 'sanLuisGonzaga'
          break;
        default:
          templateName = 'sanLuisGonzaga'
          break;
      }
      return view.render(`Documents/${templateName}`, { data });
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
      const contrato_object = await contrato.create({ data: JSON.stringify(data) });
      await GenerateFuecService.fuec(contrato_object)
      if (contrato_object.id) {
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
      const url = 'public/' + namesImg[0] + '.png';
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
    try {
      let base64Image = data.split(';base64,').pop();
      const namesImg = generator.generateMultiple(1, {
        length: 20,
        uppercase: false
      });
      //  /home/ubuntu/firma-contratos/back/public/${namesImg[0]}.png
      //  C:/Users/mauri/Documents/firma-contratos/back/public/${namesImg[0]}.png
      const nameFirm = `/home/ubuntu/firma-contratos/back/public/${namesImg[0]}.png`
      const a = await fs.writeFile(nameFirm, base64Image, { encoding: 'base64' }, function (err) {
        console.log('File created', err);
      });
      console.log(a)
      return namesImg[0]
    } catch (error) {
      console.log(error)
    }
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
