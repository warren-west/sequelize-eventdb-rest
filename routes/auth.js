require('dotenv').config() // getting JWT_SECRET from .env
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const db = require('../models')
const UserService = require('../services/UserService')
const userService = new UserService(db)

// POST /login
router.post('/', async (req, res) => {
    console.log("LOGIN HIT")
    // get the username & password from the req.body
    // we set default values for these properties being destructured off req.body
    // because if they're missing, the next line will throw an error 
    const { email = null, username = null, password = null } = req.body

    // check that they're valid (not empty)
    if (!username && !email) {
        return res.status(400).jsend.fail({ message: "Username required" })
    }
    if (!password) {
        return res.status(400).jsend.fail({ message: "Password required" })
    }

    try {
        // fetch the user data from DB using the username (or email)
        // using a ternary operation to decide if we're getting the user data by email or username
        const result = (!email)
            ? await userService.getByUsername(username)
            : await userService.getByEmail(email)

        const parsedResult = JSON.parse(JSON.stringify(result)) // || null

        // check for a 401 if the user is not found or
        // password doesn't match username
        if (!result || parsedResult.password !== password) {
            return res.status(401).jsend.fail({ message: "Please enter the correct credentials" })
        }

        // remove the password from the user object, "result"
        // after we've checked that result is not null
        // we don't want to see any passwords on a JWT
        delete parsedResult.password

        // sign a new token - payload stores user data
        const token = jwt.sign(parsedResult, process.env.JWT_SECRET, { expiresIn: "1h" })

        // if everything is ok - for now, attach token to res body
        return res.status(200).jsend.success(token)

    } catch (err) {
        // server error
        return res.status(500).jsend.error(err.message)
    }
})

// POST /login/signup
router.post('/signup', async (req, res) => {

    // TODO: Sign a JWT token when the user has successfully been created
    // when a new user is created, the DB returns the new user object
    // attach that new user object to the token payload
    // for now, attach the token to the successful response


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

        // exclude the password from the JWT payload
        const parsedResult = JSON.parse(JSON.stringify(result))
        delete parsedResult.password

        const token = jwt.sign(parsedResult, process.env.JWT_SECRET, { expiresIn: "1h" })

        return res.status(201).jsend.success(token)

    } catch (err) {
        // internal server error
        // not ideal to send back the exact error message
        // it could expose secrets about the inner workings of our system
        // maybe rather send back generic message like "internal server error"
        return res.status(500).jsend.error(err.message)
    }
})

module.exports = router