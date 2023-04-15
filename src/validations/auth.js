const Joi = require('joi');

const registerValidator = (data) => {
    const rule = Joi.object({
        lastName: Joi.string().min(1).max(225).required(),
        firstName: Joi.string().min(1).max(225).required(),
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$'))
            .min(8).max(225)
            .required(),
        repeatPassword: Joi.ref('password'),
    });

    return rule.validate(data);
};

module.exports.registerValidator = registerValidator;
