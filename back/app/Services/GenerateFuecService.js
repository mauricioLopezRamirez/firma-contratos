'use strict';
const mailService = use('App/Services/MailService');
const generator = require('generate-password');
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
  async fuec(data) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`${Env.get('APP_URL')}/api/loadInfoInFuec?data=${JSON.stringify(data)}`, { waitUntil: 'networkidle2' });
      const pdf = await page.pdf({ path: `public/contratos/${data.nameFuec}`, format: 'A4', margin: {top: 30, left: 30, right: 30, bottom: 30} });
      await browser.close();
      const emails = ['mauricio.lopez@umanizales.edu.co'];
      await mailService.sendEmail(`public/contratos/${data.nameFuec}`, emails);
      return true;
    } catch (error) {
      console.log('GenerateFuecService.fuec', error)
    }
  }

}

module.exports = new GenerateFuecService();
