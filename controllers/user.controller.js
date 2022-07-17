const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const { generateToken } = require('../middlewares/authentication')

exports.userSignUp = async (req, res) => {
    const body = req.body
    const getUsername = body.email.split("@")[0]

    User.findOne({
        where: {
            email: body.email
        }
    }).then((findUser) => {
        if(findUser) {
            return res.status(409).json({
                'status': 409,
                'message': 'Email already registered'
            })
        } else {

            const hashPassword = bcrypt.hashSync(body.password, 10)

            User.create({
                full_name: body.fullName,
                email: body.email,
                password: hashPassword,
                date_of_birth: body.dateOfBirth,
                gender: body.gender,
                username: getUsername,
                bio: ""
            }).then((user) => {
                return res.status(201).json({
                    'data': {
                        'full_name': user.full_name,
                        'email': user.email,
                        'date_of_birth': user.date_of_birth,
                        'gender': user.gender,
                        'username': user.username,
                        'bio': user.bio
                    },
                    "status": 201,
                    "message": "Successful registration"
                })
            }).catch((err) => {
                console.log(err)
                return res.status(400).json({
                    "status": 400,
                    "message": "Registration failed"
                })
            })
        }
    }).catch((err) => {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal Server Error, Please repeat in a moment'
        })
    })
}

exports.userLogin = async (req, res) => {
    const body = req.body

    User.findOne({
        where: {
            email: body.email
        }
    }).then((findUser) => {
        if(!findUser) {
            return res.status(404).json({
                "status": 404,
                "message": 'Email is not registered, please sign up'
            })
        } else {
            const checkValid = bcrypt.compareSync(body.password, findUser.password)

            if(!checkValid) {
                return res.status(401).json({
                    'status': 401,
                    'message': 'Email or password incorrect'
                })
            } else {
                const token = generateToken({
                    id: findUser.id,
                    full_name: findUser.full_name,
                    email: findUser.email
                })
                return res.status(200).json({
                    'data': {
                        'full_name': findUser.full_name,
                        'email': findUser.email,
                        'date_of_birth': findUser.date_of_birth,
                        'gender': findUser.gender,
                        'username': findUser.username,
                        'bio': findUser.bio
                    },
                    'token': token,
                    'status': 200,
                    'message': 'Login successfully'
                })
            }
        }
    }).catch((err) => {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal Server Error, Please repeat in a moment'
        })
    })
}

exports.getUserProfile = async (req, res) => {
    const id = req.id

    User.findOne({
        where: {
            id: id
        },
        attributes: { exclude: ['password'] }
    }).then((user) => {
        return res.status(200).json({
            'data': user,
            'status': 200,
            'message': 'Success'
        })
    }).catch((err) => {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal Server Error, Please repeat in a moment'
        })
    })
}

exports.updateUser = async (req, res) => {
    const id = req.id
    const body = req.body

    User.findOne({
        where: {
            id: id
        }
    }).then((findUser) => {
        if(!findUser) {
            return res.status(404).json({
                'status': 404,
                'message': 'User not found'
            })
        } else {
            const hashPassword = bcrypt.hashSync(body.password, 10)
            if(body.password != null) {
                User.update(
                    {
                        full_name: body.fullName,
                        email: body.email,
                        password: hashPassword,
                        date_of_birth: body.dateOfBirth,
                        gender: body.gender,
                        username: body.username,
                        bio: body.bio
                    },
                    {
                    where: {
                        id: id
                    }
                }).then((user) => {
                    return res.status(200).json({
                        'data': {
                            'full_name': user.full_name,
                            'email': user.email,
                            'date_of_birth': user.date_of_birth,
                            'gender': user.gender,
                            'username': user.username,
                            'bio': user.bio
                        },
                        'status': 200,
                        'message': 'Successfully update data'
                    })
                })
            } else {
                User.update(
                    {
                        full_name: body.fullName,
                        email: body.email,
                        password: findUser.password,
                        date_of_birth: body.dateOfBirth,
                        gender: body.gender,
                        username: body.username,
                        bio: body.bio
                    },
                    {
                    where: {
                        id: id
                    }
                }).then((user) => {
                    return res.status(200).json({
                        'data': {
                            'full_name': user.full_name,
                            'email': user.email,
                            'date_of_birth': user.date_of_birth,
                            'gender': user.gender,
                            'username': user.username,
                            'bio': user.bio
                        },
                        'status': 200,
                        'message': 'Successfully update data'
                    })
                })
            }
        }
    }).catch((err) => {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal Server Error, Please repeat in a moment'
        })
    })
}

exports.deleteUser = async (req, res) => {
    const id = req.id

    User.destroy({
        where: {
            id: id
        }
    }).then(() => {
        if(req.params.userId != id) {
            return res.status(401).send({
                'status': 401,
                'message': 'Failed for delete data'
            })
        } else {
            return res.status(200).json({
                'status': 200,
                'message': 'Your account has been successfully deleted'
            })
        }
    }).catch((err) => {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal Server Error, Please repeat in a moment'
        })
    })
}