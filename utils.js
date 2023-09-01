const jwt = require('jsonwebtoken')

class JWT {
    static generateToken(userId) {
        return jwt.sign({ userId }, "Doniyor")
    }

    static decodeToken(token) {
        return jwt.decode(token, { complete: true })
    }
}


module.exports = { JWT }