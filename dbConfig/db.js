const db = require('../models')

async function initDb() {
    try {
        await db.sequelize.sync({ force: true })
        await populateDb()
    } catch (err) {
        console.log(err.message)
    }
}

async function populateDb() {
    try {
        await db.Event.bulkCreate([
            {
                name: "Tech Conference 2025",
                date: "2025-05-15",
                location: "Oslo Convention Center",
                capacity: 500,
                isOnline: false
            },
            {
                name: "Jazz in the Park",
                date: "2025-07-10",
                location: "Central Park",
                capacity: 150,
                isOnline: false
            },
            {
                name: "Online Marketing Workshop",
                date: "2025-03-20",
                location: "Zoom",
                capacity: 50,
                isOnline: true
            },
            {
                name: "Food Truck Festival",
                date: "2025-06-05",
                location: "Oslo Waterfront",
                capacity: 1000,
                isOnline: false
            },
            {
                name: "Startup Pitch Night",
                date: "2025-04-12",
                location: "Innovation Hub",
                capacity: 200,
                isOnline: false
            },
            {
                name: "Coding Bootcamp",
                date: "2025-08-01",
                location: "Online",
                capacity: 30,
                isOnline: true
            },
            {
                name: "Art Exhibition",
                date: "2025-09-15",
                location: "City Gallery",
                capacity: 250,
                isOnline: false
            },
            {
                name: "Yoga Retreat",
                date: "2025-11-10",
                location: "Mountain Lodge",
                capacity: 40,
                isOnline: false
            },
            {
                name: "E-sports Tournament",
                date: "2025-12-01",
                location: "Gaming Arena",
                capacity: 500,
                isOnline: false
            },
            {
                name: "Web Development Webinar",
                date: "2025-02-15",
                location: "Webinar Platform",
                capacity: 100,
                isOnline: true
            },
            {
                name: "Business Networking Night",
                date: "2025-03-30",
                location: "Downtown Hotel",
                capacity: 75,
                isOnline: false
            },
            {
                name: "Charity Run",
                date: "2025-04-20",
                location: "City Stadium",
                capacity: 300,
                isOnline: false
            },
            {
                name: "Photography Workshop",
                date: "2025-06-25",
                location: "Riverside Studio",
                capacity: 20,
                isOnline: false
            },
            {
                name: "Music Festival",
                date: "2025-07-15",
                location: "Beachside Venue",
                capacity: 2000,
                isOnline: false
            },
            {
                name: "Virtual Cooking Class",
                date: "2025-05-10",
                location: "Online",
                capacity: 25,
                isOnline: true
            },
            {
                name: "Public Speaking Seminar",
                date: "2025-10-05",
                location: "Conference Hall",
                capacity: 100,
                isOnline: false
            },
            {
                name: "Language Exchange Meetup",
                date: "2025-01-20",
                location: "Café Central",
                capacity: 30,
                isOnline: false
            },
            {
                name: "Science Fair",
                date: "2025-11-15",
                location: "Exhibition Center",
                capacity: 500,
                isOnline: false
            },
            {
                name: "Film Screening",
                date: "2025-08-20",
                location: "Cinema House",
                capacity: 150,
                isOnline: false
            },
            {
                name: "Gardening Workshop",
                date: "2025-09-10",
                location: "Community Center",
                capacity: 50,
                isOnline: false
            }
        ])

        await db.User.bulkCreate([
            {
                username: "admin",
                dob: "2025-01-01",
                email: "admin@localhost.com",
                role: "admin"
            },
            {
                username: "guest",
                dob: "2025-01-01",
                email: "guest@localhost.com",
                role: "user"
            },
        ])

        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = initDb