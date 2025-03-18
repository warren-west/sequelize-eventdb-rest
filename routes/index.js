require('dotenv').config()
const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    return res.json({ status: "success", message: "hello world" })
})

router.post('/', (req, res) => {
    // console.log(req.headers.authorization)
    // get the encoded token text from the req authorization header:
    const token = req.headers.authorization.split(' ')[1]

    // try validate the token using jsonwebtoken:
    let parsedToken
    try {
        parsedToken = jwt.decode(token)

    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }

    // invalid token - synchronous
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        // err
        console.log(decoded)
        return res.status(401).json({ status: "error", message: err.message })
    }

    return res.json({ status: "success", token, parsedToken })
})

router.post('/newtoken', (req, res) => {
    const payload = { fullname: "Warren West", age: 32, isMarried: true }
    const options = { expiresIn: "1h" }

    try {
        // create a new token
        const token = jwt.sign(payload, process.env.JWT_SECRET, options)
        console.log(token)
        return res.json({ status: "success", token })
    } catch (err) {
        // problem creating new token
        console.log(err.message)
        return res.json({ status: "error", message: err.message })
    }
})

module.exports = router