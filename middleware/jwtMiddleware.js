require('dotenv').config() // JWT_SECRET
const jwt = require('jsonwebtoken')

// helper functions
function getTokenFromReq(req, res) {
    try {
        // check if the token on the req header isn't null
        if (!req.headers.authorization) throw jwt.JsonWebTokenError
    } catch (err) {
        return res.status(401).jsend.fail({ message: "Invalid token" })
    }

    // get the token from the req
    return req.headers.authorization.split(' ')[1]
}

function validToken(req, res, next) {
    const token = getTokenFromReq(req, res)

    // verify the token
    try {
        // if it's invalid, throw a 401 error
        // else call next()
        jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        // the token could could be expired
        // or the token could be invalid
        // but either way we return a 401
        return res.status(401).jsend.fail({ message: "Invalid token" })
    }
    next()
}

function isAdmin(req, res, next) {
    const token = getTokenFromReq(req, res)

    // verify the token
    try {
        // if it's invalid, throw a 401 error
        // if the payload has a user with "admin" role, call next()
        // else throw a 401 error

        jwt.verify(token, process.env.JWT_SECRET)
        const parsedToken = jwt.decode(token)

        // make sure we understand the token's structure that we're using
        console.log(parsedToken)

        // maybe we shouldn't hardcode "admin" here
        // but store it as a value somewhere
        if (parsedToken.role === "admin")
            next()
        else
            return res.status(401).jsend.fail({ message: "Unauthorized to access this endpoint" })

    } catch (error) {
        // the token could could be expired
        // or the token could be invalid
        // but either way we return a 401
        return res.status(401).jsend.fail({ message: "Invalid token" })
    }
}

const jwtMiddleware = {
    validToken,
    isAdmin,
}

module.exports = jwtMiddleware