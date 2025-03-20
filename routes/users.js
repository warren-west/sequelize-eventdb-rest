const router = require('express').Router()
const { isAdmin } = require('../middleware/jwtMiddleware')
const db = require('../models')
const UserService = require('../services/UserService')
const userService = new UserService(db)

// GET /users returns all users from the DB
router.get('/', isAdmin, async (req, res) => {
    // return all users from DB (dev mode test)
    // TODO: Not top priority

    try {
        const results = await userService.getAllUsers()
        res.status(200).jsend.success(results)
    } catch (err) {
        res.status(500).jsend.error(err.message)
    }

    // return res.jsend.fail({ message: "Not implemented" })
})

router.get('/:username', async (req, res) => {
    // return the matching user to the username
    // TODO: Not top priority
    try {
        if (!req.params.username) {
            return res.status(400).jsend.fail({ message: "Username required" })
        }

        const result = await userService.getByUsername(req.params.username)

        if (!result) {
            return res.status(404).jsend.fail({ message: "User not found" })
        }

        return res.status(200).jsend.success(result)

    } catch (err) {
        res.status(500).jsend.error(err.message) // be careful not to expose implementation details through an error message, maybe replace this with "internal server error"
    }

    return res.jsend.fail({ message: "Not implemented" })
})

// This we don't actually need.
// It's different implementation to the /login/signup endpoint
// We're just testing that a new user can be created successfully
router.post('/', async (req, res) => {
    // sending through the whole req.body to the service
    // const { username, password, dob, email } = req.body

    if (!req.body.username || !req.body.password || !req.body.dob || !req.body.email) {
        return res.status(400).jsend.fail({ message: "Bad request" })
    }

    try {
        // TODO: Check if a user with the same username / email already exists
        // then return status 400

        const result = await userService.createUser(req.body)

        // TODO: Implement JWT functionality
        // If a user has successfully signed up, create a token
        // in dev mode - return the token with the JSON response
        // but DO NOT do this in production

        return res.status(201).jsend.success(result)

    } catch (err) {
        console.log(err.message)
        // internal server error
        // not ideal to send back the exact error message
        // it could expose secrets about the inner workings of our system
        // maybe rather send back generic message like "internal server error"
        return res.status(500).jsend.error(err.message)
    }
})


module.exports = router