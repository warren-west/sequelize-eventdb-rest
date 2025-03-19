module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: "Username cannot be empty"
                },
                len: {
                    args: [1, 100],
                    msg: "Username text should be less than 100 characters"
                }
            }
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING.BINARY, // won't be visible at face value in the DB
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(10),
            defaultValue: "user"
        }
    }, {
        timestamps: false
    })

    User.associate = (db) => {
        // place to add associations
        console.log("User.associate")
        console.log(db)
        User.belongsToMany(db.Event, {through: "user_events"})
    }

    return User

}