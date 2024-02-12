
const Joi = require('joi');

const registerSchema = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().required()
});

class RegisterModel {
    constructor(fullName, username, password, email, mobileNumber) {
        const { error } = registerSchema.validate({ fullName, username, password, email, mobileNumber });
        if (error) throw new Error(error.details[0].message);

        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.mobileNumber = mobileNumber;
    }
}

module.exports = RegisterModel;
