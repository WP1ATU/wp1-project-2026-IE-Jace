const router = require('express').Router();
const Lookup = require('../models/lookup.model');

router.get('/', async (_req, res, next) => {
  try {
    const lookups = await Lookup.find().sort({ createdAt: -1 }).limit(50);
    res.json(lookups);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { kind, refLabel, dateOrYear, locationId, notes } = req.body;

    if (!kind || !refLabel || !dateOrYear) {
      return res.status(400).json({ ok: false, message: 'kind, refLabel, dateOrYear are required' });
    }
    if (!['phase', 'day', 'season'].includes(kind)) {
      return res.status(400).json({ ok: false, message: 'kind must be one of: phase, day, season' });
    }

    const created = await Lookup.create({
      kind,
      refLabel,
      dateOrYear,
      locationId,
      notes,
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

module.exports = router;