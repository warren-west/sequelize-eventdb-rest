const router = require('express').Router()
const db = require('../models')
const UserService = require('../services/UserService')
const userService = new UserService(db)


router.get('/', (req, res) => {
    const { email } = req.body
    // return the matching user to the email
    // TODO: Not top priority

    return res.jsend.fail({ message: "Not implemented" })
})
router.get('/:username', (req, res) => {
    // return the matching user to the username
    // TODO: Not top priority

    return res.jsend.fail({ message: "Not implemented" })
})

router.post('/', async (req, res) => {
    // sending through the whole req.body to the service
    // const { username, password, dob, email } = req.body

    try {
        // TODO: Check if a user with the same username / email already exists
        // then return status 400

        const result = await userService.createUser(req.body)

        // TODO: Implement JWT functionality
        // If a user has successfully signed up, create a token
        // in dev mode - return the token with the JSON response
        // but DO NOT do this in production

        return res.status(201).jsend.success(result)

    } catch(err) {
        // internal server error
        // not ideal to send back the exact error message
        // it could expose secrets about the inner workings of our system
        // maybe rather send back generic message like "internal server error"
        return res.status(500).jsend.error(err.message)
    }
})

module.exports = router