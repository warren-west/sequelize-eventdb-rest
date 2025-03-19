class UserService {
    constructor(db) {
        this.client = db.sequelize
        this.User = db.User
    }

    // CRUD

    // get all users
    async getAllUsers() {
        return this.User.findAll()
    }

    // assuming emails are unique
    async getByEmail(email) {
        return this.User.findOne({ where: { email } })
    }
    
    // assuming usernames are unique
    async getByUsername(username) {
        return this.User.findOne({ where: { username } })
    }
    
    // create a new user in the DB
    async createUser(payload) {
        return this.User.create({
            username: payload.username,
            email: payload.email,
            dob: payload.dob,
            password: payload.password,
        })
    }
}

module.exports = UserService