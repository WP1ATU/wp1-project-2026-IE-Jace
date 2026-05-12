const router = require('express').Router();
const Location = require('../models/location.model');

router.get('/', async (_req, res, next) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.json(locations);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { label, lat, lon, tz, dstDefault = false } = req.body;

    if (!label || lat === undefined || lon === undefined || tz === undefined) {
      return res.status(400).json({ ok: false, message: 'label, lat, lon, tz are required' });
    }

    const created = await Location.create({
      label,
      lat: Number(lat),
      lon: Number(lon),
      tz: Number(tz),
      dstDefault: Boolean(dstDefault),
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

module.exports = router;