'use strict';
const nodemailer = require("nodemailer");
const View = use('View');
const Env = use('Env')

/**
 * Generate fuec service
 */
class MailService {

  /**
* @description Envia el correo electronico
* @param {string} patch ruta del fuec a ser enviado
* @param {object} emails correos a los cuales se les enviara el documento
* @returns {string} envia el correo a las direcciones especificadas
*/
  async sendEmail(patch, emails) {
    const transporter = await this.config();
    const htmlEmail = await this.templateToHtml('emails/fuec', {});
    const data_sent = {
      from: "contratos@fuec.com",
      to: emails,
      subject: `Contrato transporte estudiantes`,
      html: htmlEmail,
      attachments: { path: patch }
    };
    const emailData = await transporter.sendMail(data_sent);
  }


  /**
   * @description configuracion email
   */
  async config() {
    let transporter = nodemailer.createTransport({
      host: Env.get('SMTP_HOST'),
      port: 587,
      secure: false,
      auth: {
        user: Env.get('MAIL_USERNAME'),
        pass: Env.get('MAIL_PASSWORD'),
      },
    });
    return transporter;
  }


  /**
 * @description Renderizar la plantilla para obtener el html
 * @param {string} template nombre de la plantilla edge
 * @param {object} bodyEmail todo el contenido que sera enviado a la plantilla para ser renderizada (parametros a llamar en el edge)
 * @returns {string} el html que debera ser enviado en el body del correo
 */
  async templateToHtml(template, bodyEmail) {
    return View.render(template, bodyEmail);
  }

}

module.exports = new MailService();
