const { Op } = require("sequelize")

class EventService {
    constructor(db) {
        this.db = db
        this.Event = db.Event
    }

    async getAll(reqQuery) {
        // if a filter is provided, use it and return the results
        const filter = {}

        // FILTER LOGIC
        // Build up the filter "WHERE" clause:
        if (reqQuery.name)
            filter.name = { [Op.like]: `%${reqQuery.name}%` }
        if (reqQuery.startDate && reqQuery.endDate)
            filter.date = { [Op.between]: [`${reqQuery.startDate}`, `${reqQuery.endDate}`] }
        if (reqQuery.isOnline) {
            filter.isOnline = { [Op.eq]: JSON.parse(reqQuery.isOnline) }
            // filter.isOnline = { [Op.eq]: reqQuery.isOnline.toLowerCase() === "true" }
        }
        if (reqQuery.minCapacity)
            filter.capacity = { [Op.gte]: parseInt(reqQuery.minCapacity) }

        // ORDERING / SORTING logic
        console.log(reqQuery.sort) // "date:asc,name:desc"


        const order = []
        if (reqQuery.sort) {
            for (let item of reqQuery.sort.split(',')) {
                // date:asc
                order.push(item.split(':'))
            }
            console.log(order)
        }
        
        // PAGINATION logic
        const { limit, page } = reqQuery

        const findAllOptions = {}
        if (filter)
            findAllOptions.where = filter
        if (order.length >= 1)
            findAllOptions.order = order
        if (parseInt(limit) && parseInt(page)) {
            const offset = (Number(page) - 1) * Number(limit)
            findAllOptions.limit = Number(limit)
            findAllOptions.offset = offset
        }

        return findAllOptions ? this.Event.findAll(findAllOptions) : this.Event.findAll()
    }

    async getById(id) {
        return this.Event.findByPk(id)
    }

    async create(newEvent) {
        return this.Event.create({
            name: newEvent.name,
            date: newEvent.date,
            location: newEvent.location,
            capacity: newEvent.capacity,
            isOnline: newEvent.isOnline,
        })
    }

    async update(updatedEvent, id) {
        return this.Event.update({
            name: updatedEvent.name,
            date: updatedEvent.date,
            location: updatedEvent.location,
            capacity: updatedEvent.capacity,
            isOnline: updatedEvent.isOnline,
        }, { where: { id } })
    }

    async delete(id) {
        return this.Event.destroy({
            where: { id }
        })
    }
}

module.exports = EventService