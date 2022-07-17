const Joi = require('joi')

exports.validation = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string()
            .required()
            .label('full name must be string and not empty'),
        email: Joi.string()
            .required()
            .email()
            .label('email must be email format'),
        dateOfBirth: Joi.date()
            .required()
            .label('date of birth must be date format'),
        gender: Joi.string()
            .required()
            .min(4)
            .label('gender must be like male, female, other'),
        username: Joi.string()
            .required()
            .min(6)
            .label('username must be at least 6 characters'),
        bio: Joi.string()
            .required()
            .max(300)
            .label('bio up to 300 characters'),
        password: Joi.string()
            .required()
            .pattern(
                new RegExp(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
            )
            .min(6)
            .label('password must be at least 6 characters consisting of the alphabet, numbers, and symbols.')
    })

    const { error } = schema.validate(req.body)

    if(error) {
        return res.status(422).json({
            'status': 422,
            'message': error.details.map(e => e.context.label).join(', ')
        })
    } else {
        next()
    }
}

exports.validationForUpdate = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string()
            .required()
            .label('full name must be string and not empty'),
        email: Joi.string()
            .required()
            .email()
            .label('email must be email format'),
        dateOfBirth: Joi.date()
            .required()
            .label('date of birth must be date format'),
        gender: Joi.string()
            .required()
            .min(4)
            .label('gender must be like male, female, other'),
        username: Joi.string()
            .required()
            .min(6)
            .label('username must be at least 6 characters'),
        bio: Joi.string()
            .required()
            .max(300)
            .label('bio up to 300 characters'),
        password: Joi.string()
            .pattern(
                new RegExp(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
            )
            .min(6)
            .label('password must be at least 6 characters consisting of the alphabet, numbers, and symbols.')
    })

    const { error } = schema.validate(req.body)

    if(error) {
        return res.status(422).json({
            'status': 422,
            'message': error.details.map(e => e.context.label).join(', ')
        })
    } else {
        next()
    }
}

exports.validationForLogin = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email()
            .label('email must be email format'),
        password: Joi.string()
            .pattern(
                new RegExp(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
            )
            .min(6)
            .label('password must be at least 6 characters consisting of the alphabet, numbers, and symbols.')
    })

    const { error } = schema.validate(req.body)

    if(error) {
        return res.status(422).json({
            'status': 422,
            'message': error.details.map(e => e.context.label).join(', ')
        })
    } else {
        next()
    }
}