module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: "Event name cannot be empty"
                },
                len: {
                    args: [1, 100],
                    msg: "Event name text should be less than 100 characters"
                }
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                isAfter: {
                    args: [new Date().toString()],
                    msg: "Date should be in the future"
                },
            }
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: "Event location cannot be empty"
                },
                len: {
                    args: [1, 255],
                    msg: "Location text should be less than 255 characters"
                }
            }
        },
        capacity: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: true,
                min: {
                    args: [1],
                    msg: "Capacity must be a positive integer"
                }
            },
        },
        isOnline: DataTypes.BOOLEAN,
    })

    Event.associate = (db) => {
        // place to add associations
    }

    return Event
}