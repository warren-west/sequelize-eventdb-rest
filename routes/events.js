const router = require('express').Router()
const { ValidationError } = require('sequelize')
const db = require('../models')
const EventService = require('../services/EventService')
const eventService = new EventService(db)

router.get('/', async (req, res) => {
    try {        
        const results = await eventService.getAll(req.query)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        if (!parseInt(req.params.id))
            return res.status(400).json({ message: "Bad request" })

        const result = await eventService.getById(req.params.id)
        if (!result)
            return res.status(404).json({ message: "Not found" })

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
    try {
        if (!parseInt(req.params.id) || !req.body)
            return res.status(400).json({ message: "Bad request" })

        if (!await eventService.getById(req.params.id))
            return res.status(404).json({ message: "Not found" })

        const response = await eventService.update(req.body, req.params.id)
        res.status(204).json(response)
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

router.delete('/:id', async (req, res) => {

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