const axios = require('axios')
const User = require('../schemas/user')
const { decodeToken, generateToken } = require('../utils').JWT

async function getOrCreateUser(value) {
    let user = await User.findOne({ email: value });

    if (!user) {
        user = await User.create({ email: value })
    }

    return user;
}


async function authCodeToAccessToken(code) {
    const email = await autheticationCodeToEmail(code)
    const user = await getOrCreateUser(email)
    const token = generateToken(user._id)
    return [user, token]
}



async function autheticationCodeToEmail(code) {
    try {
        const token_endpoint = 'https://oauth2.googleapis.com/token'

        const data = {
            'code': code,
            'client_id': '702350934784-4dp2n71aj211r8ntti7r7aa8finnrt9n.apps.googleusercontent.com',
            'client_secret': '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',
            'redirect_uri': 'http://localhost:8000/google-callback/',
            'grant_type': 'authorization_code',
        }

        const res = await axios.post(token_endpoint, data)
        const token = res.data.access_token
        const email = await getUserEmail(token)
        return email

    } catch (error) {
        console.log(error);
    }
}


async function getUserEmail(access_token) {
    try {
        const userinfo_endpoint = "https://www.googleapis.com/oauth2/v2/userinfo"
        const headers = { 'Authorization': `Bearer ${access_token}` }
        const res = await axios.get(userinfo_endpoint, { headers: headers })
        return res.data.email
    } catch (error) {
        console.log(error);
    }
}

module.exports = { authCodeToAccessToken }