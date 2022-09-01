'use strict';
const mailService = use('App/Services/MailService');
const generator = require('generate-password');
const contrato = use('App/Models/Contract');
const nodemailer = require("nodemailer");
const puppeteer = require('puppeteer');
const Logger = use('Logger')
const Env = use('Env');

/**
 * Generate fuec service
 */
class GenerateFuecService {
  /**
   * genera el pdf del fuec
   * @param {string}
   * @param {string}
   */
  async fuec(contrato) {
    try {
      const browser = await puppeteer.launch();
      const data = JSON.parse(contrato.data)
      const page = await browser.newPage();
      await page.goto(`${Env.get('APP_URL')}/api/loadInfoInFuec?id=${contrato.id}`, { waitUntil: 'networkidle2' });
      const pdf = await page.pdf({ path: `public/contratos/${data.nameFuec}`, format: 'A4', margin: { top: 30, left: 30, right: 30, bottom: 30 } });
      const emails = ['synergyspecials2@gmail.com', data.email_responsable];
      await mailService.sendEmail(`public/contratos/${data.nameFuec}`, emails);
      await page.close();
      await browser.close();
      return true;
    } catch (error) {
      console.log('GenerateFuecService.fuec', error)
    }
  }

}

module.exports = new GenerateFuecService();

