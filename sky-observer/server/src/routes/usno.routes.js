const router = require('express').Router();
const usno = require('../services/usno.service');

router.get('/moon/phases/year', async (req, res, next) => {
  try {
    res.json(await usno.getMoonPhasesYear(req.query.year));
  } catch (err) {
    next(err);
  }
});

router.get('/rstt/oneday', async (req, res, next) => {
  try {
    res.json(await usno.getOneDay(req.query));
  } catch (err) {
    next(err);
  }
});

router.get('/seasons', async (req, res, next) => {
  try {
    res.json(await usno.getSeasons(req.query));
  } catch (err) {
    next(err);
  }
});

module.exports = router;