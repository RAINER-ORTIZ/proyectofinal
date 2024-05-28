// routes/goals.js
const express = require('express');
const router = express.Router();
const Goal = require('../models/goal');

// Obtener todas las metas
router.get('/getGoals', async (req, res) => {
    try {
        const goals = await Goal.find();
        res.json(goals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Agregar una nueva meta
router.post('/addGoal', async (req, res) => {
    const goal = new Goal({
        name: req.body.name,
        description: req.body.description,
        targetDate: req.body.targetDate,
    });

    try {
        const newGoal = await goal.save();
        res.status(201).json(newGoal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una meta por ID
router.delete('/removeGoal/:id', async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        res.json({ message: 'Meta eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
