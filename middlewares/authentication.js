const jwt = require('jsonwebtoken')
let privateKey = 'Seru juga ya challenge nya'

const verify = async(req, res, next) => {
    const token = req.headers["x-access-token"]
    jwt.verify(token, privateKey, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                'status': 401,
                'message': 'You are not logged in or the login session has ended, please login again'
            })
        }
        req.id = decoded.id
        next()
    })
}

const generateToken = (payload) => {
    return jwt.sign(payload, privateKey, {
        algorithm: 'HS256',
        expiresIn: '7d'
    })
}

module.exports = {
    verify,
    generateToken
}