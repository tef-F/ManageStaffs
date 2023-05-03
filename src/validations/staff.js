const Joi = require('joi');

const staffValidation = (data) => {
    const rule = Joi.object({
        fullName: Joi.string().min(1).max(225).required(),
        DoB: Joi.date().required(),
        homeTown: Joi.string().min(1).max(225).required(),
        sex: Joi.string().min(1).max(225).required(),
        nation: Joi.string().min(1).max(225).required(),
        phoneNumber: Joi.number.min(1).max(11).required(),
        graduationDate: Joi.date(),
        university: Joi.string().min(1).max(225),
        literacyId: Joi.string().min(1).max(225).required(),
        salaryScale: Joi.string().min(1).max(225).required(),
        area: Joi.string().min(1).max(225).required(),
        position: Joi.string().min(1).max(225).required(),
        laborContract: Joi.string().min(1).max(225).required(),
    });

    return rule.validate(data);
}

module.exports.staffValidation = staffValidation;
