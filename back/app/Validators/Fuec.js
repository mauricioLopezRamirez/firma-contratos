'use strict';

const { formatters, validate } = use('Validator');

class Fuec {
    async validation(data) {
        const validation = await validate(data, this.rules, this.messages, this.formatter);
        if (validation.fails()) {
            return { error: true, msg: validation.messages() };
        }
        return { error: false };
    }
    get rules() {
        return {
            companyName: 'required | string',
            companyAddress: 'required | string',
            companyPhone: 'required | string',
            companyEmail: 'required | string',
            enablingResolutionNumber: 'required | string',
            yearAuthorization: 'required | string',
            territorialAddressCode: 'required | string',
            nitCompany: 'required | string',
            nameContractor: 'required | string',
            contractorIdentification: 'required | string',
            contractorEmail: 'required | string',
            contractObject: 'required | string',
            responsibleFullName: 'required | string',
            responsibleIdentification: 'required | string',
            responsiblePhone: 'required | string',
            responsibleDirection: 'required | string',
            origin: 'required | string',
            destination: 'required | string',
            agreementConsortium: 'required | string',
            startDate: 'required | string',
            endDate: 'required | string',
            licensePlate: 'required | string',
            model: 'required | string',
            brand: 'required | string',
            class: 'required | string',
            internalNumber: 'required | string',
            operationCardNumber: 'required | string',
            driverName: 'required | string',
            driverFirstSurname: 'required | string',
            driverSecondSurname: 'required | string',
            driverIdentification: 'required | string',
            driverEmail: 'required | string',
            licenseExpirationDate: 'required | string',
        };
    }
    get formatter() {
        return formatters.JsonApi;
    }

    async fails(errorMessages) {
        return this.ctx.response.badRequest(errorMessages);
    }
}

module.exports = new Fuec();