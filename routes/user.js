const router = require('express').Router()
const { authCodeToAccessToken } = require('../base/auth')
router.get('/', async (req, res) => {
    res.render('home')
})

router.get('/google-callback/', async (req, res) => {
    const { code } = req.query
    const [user, token] = await authCodeToAccessToken(code)
    res.status(200).json({
        token,
        user
    })
})

module.exports = router