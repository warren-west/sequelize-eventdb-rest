const router = require('express').Router()
const { ValidationError } = require('sequelize')
const db = require('../models')
const EventService = require('../services/EventService')
const eventService = new EventService(db)
const { validToken, isAdmin } = require('../middleware/jwtMiddleware')

/** {baseUrl}/api/v1/events
 * Get all events
 */
router.get('/', async (req, res) => {
    // #swagger.tags = ['Events']
    // #swagger.description = "Gets all the events from the DB"
    // #swagger.summary = "Gets all the events from the DB"
    // #swagger.produces = ['application/json']
    // #swagger.responses[200] = { description: "Event records were successfully retrieved from the DB." }
    // #swagger.responses[500] = { description: "Internal server error." }
    // #swagger.parameters['name'] = { description: 'Filter by event name (partial match)', in: 'query', type: 'string', default: 'jazz' }
    // #swagger.parameters['startDate'] = { description: 'Filter events with start date greater than or equal to this date (YYYY-MM-DD)', in: 'query', type: 'string', format: 'date', default: '2025-01-10' }
    // #swagger.parameters['endDate'] = { description: 'Filter events with end date less than or equal to this date (YYYY-MM-DD)', in: 'query', type: 'string', format: 'date', default: '2025-05-10' }
    // #swagger.parameters['minCapacity'] = { description: 'Filter events with minimum capacity', in: 'query', type: 'integer', default: 50 }
    // #swagger.parameters['page'] = { description: 'Pagination offset', in: 'query', type: 'integer', default: 1 }
    // #swagger.parameters['limit'] = { description: 'Pagination limit', in: 'query', type: 'integer', default: 5 }
    // #swagger.parameters['sort'] = { description: 'Sort by fields (e.g., name:asc,date:desc)', in: 'query', type: 'string' }

    try {
        const results = await eventService.getAll(req.query)
        res.jsend.success(results)
        // res.status(200).json(results)
    } catch (error) {
        res.jsend.error("Internal server error")
        // res.status(500).json({ message: error.message })
    }
})

/**
 * Retrieve an Event record from the DB, by Id.
 */
router.get('/:id', async (req, res) => {
    // #swagger.tags = ['Events']
    // #swagger.description = 'Retrieve a record from the DB, by Id.'
    // #swagger.summary = 'Retrieve a record from the DB, by Id.'
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    // #swagger.responses[200] = { description: 'Event has been retrieved successfully' }
    // #swagger.responses[400] = { description: 'Invalid Id provided' }
    // #swagger.responses[404] = { description: 'Event not found' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    // #swagger.parameters['id'] = { description: 'Id of the Event to be retrieved', default: 1 }

    try {
        // throw Error("test error")
        if (!parseInt(req.params.id))
            return res.status(400).jsend.fail({ message: "ID is required" })
            // return res.status(400).json({ message: "Bad request" })

        const result = await eventService.getById(req.params.id)
        if (!result)
            return res.status(404).jsend.fail({ message: "Event not found" })
            // return res.status(404).json({ message: "Not found" })

        res.status(200).json(result)
    } catch (error) {
        res.status(500).jsend.error("internal server error")
        // res.status(500).json({ error: error.message })
    }
})

/**
 * Create a new event in the DB
 */
router.post('/', async (req, res) => {
    // #swagger.tags = ['Events']
    // #swagger.description = 'Creates a new Event.'
    // #swagger.summary = 'Create a new Event in the DB.'
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    // #swagger.responses[201] = { description: 'Event has been created successfully' }
    // #swagger.responses[400] = { description: 'Invalid input provided' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    /* #swagger.parameters['body'] = {
        "in": "body",
        "schema": {
            $ref: "#/definitions/Event"
        }
    } 
    */
    try {
        if (!req.body)
            return res.status(400).json({ message: "Bad request" })

        const response = await eventService.create(req.body)
        res.status(201).json({ success: response })

    } catch (error) {
        if (error instanceof ValidationError) {
            let errorMessages = []
            // console.log(error)
            for (let e of error.errors)
                errorMessages.push({ message: e.message, value: e.value, type: e.type })

            return res.status(400).json({ errors: errorMessages })
        }

        res.status(500).json({ message: error.message })
    }
})

/**
 * Update an Event record in the DB.
 */
router.put('/:id', validToken, async (req, res) => {
    // #swagger.tags = ['Events']
    // #swagger.description = 'Update a record in the DB, by Id.'
    // #swagger.summary = 'Update a record in the DB, by Id.'
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    // #swagger.responses[204] = { description: 'Event has been updated successfully' }
    // #swagger.responses[400] = { description: 'Invalid input provided' }
    // #swagger.responses[401] = { description: 'You need to be logged in to update an event' }
    // #swagger.responses[404] = { description: 'Event not found' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    // #swagger.parameters['id'] = { description: 'Id of the Event to be updated' }
    /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update an Event',
            schema: { $ref: '#/definitions/Event' }
    } */

    try {
        if (!parseInt(req.params.id) || !req.body)
            return res.status(400).json({ message: "Bad request" })

        if (!await eventService.getById(req.params.id))
            return res.status(404).json({ message: "Not found" })

        const response = await eventService.update(req.body, req.params.id)
        res.status(204).jsend.success({ message: "Event updated successfully" })
    } catch (error) {
        if (error instanceof ValidationError) {
            let errorMessages = []
            // console.log(error)
            for (let e of error.errors)
                errorMessages.push({ message: e.message, value: e.value, type: e.type })

            return res.status(400).json({ errors: errorMessages })
        }

        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', isAdmin, async (req, res) => {
    // #swagger.tags = ['Events']
    // #swagger.description = 'Delete a record from the DB, by Id.'
    // #swagger.summary = 'Delete a record from the DB, by Id.'
    // #swagger.parameters['id'] = { description: 'The Id of the Event to be deleted' }
    // #swagger.responses[204] = { description: 'Event has been deleted successfully' }
    // #swagger.responses[400] = { description: 'Invalid Id provided' }
    // #swagger.responses[401] = { description: 'You need to be an admin to delete an event' }
    // #swagger.responses[404] = { description: 'Event not found' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']

    try {
        if (!parseInt(req.params.id))
            return res.status(400).json({ message: "Bad request" })

        if (!await eventService.getById(req.params.id))
            return res.status(404).json({ message: "Not found" })

        const response = await eventService.delete(req.params.id)
        res.status(204).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router