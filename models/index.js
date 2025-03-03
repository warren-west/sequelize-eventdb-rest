const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()
const fs = require('fs')
const path = require('path')

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT
})

const db = { sequelize }

// Import all models dynamically
fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.model.js'))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes)
        db[model.name] = model
})

// Configure any relationships
Object.keys(db).forEach(prop => {
    if(db[prop].associate) {
        db[prop].associate(db)   
    }
})

module.exports = db