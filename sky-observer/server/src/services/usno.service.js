const axios = require('axios');
const https = require('https');

const BASE = process.env.USNO_BASE_URL || 'https://aa.usno.navy.mil/api';
const USE_STUB = process.env.USNO_STUB === 'true';

const client = axios.create({
  baseURL: BASE,
  timeout: 10000,
  httpsAgent: new https.Agent({ family: 4 }),
  headers: {
    Accept: 'application/json',
    'User-Agent': 'sky-observer/1.0',
  },
});

function moonStub(year) {
  const y = Number(year) || new Date().getFullYear();
  return {
    apiversion: 'stub',
    phasedata: [
      { phase: 'New Moon', year: y, month: 1, day: 11, time: '11:57' },
      { phase: 'First Quarter', year: y, month: 1, day: 18, time: '03:53' },
      { phase: 'Full Moon', year: y, month: 1, day: 25, time: '17:54' },
      { phase: 'Last Quarter', year: y, month: 2, day: 2, time: '23:18' },
    ],
  };
}

function oneDayStub(params) {
  return {
    source: 'stub',
    input: params,
    sun: { rise: '06:10', set: '20:45' },
    moon: { rise: '18:32', set: '04:11', phase: 'Waxing Gibbous' },
  };
}

function seasonsStub(year) {
  const y = Number(year) || new Date().getFullYear();
  return {
    data: [
      { phenom: 'March Equinox', year: y, month: 3, day: 20, time: '03:06' },
      { phenom: 'June Solstice', year: y, month: 6, day: 20, time: '20:51' },
      { phenom: 'September Equinox', year: y, month: 9, day: 22, time: '12:44' },
      { phenom: 'December Solstice', year: y, month: 12, day: 21, time: '09:20' },
    ],
  };
}

async function getMoonPhasesYear(year) {
  if (USE_STUB) return moonStub(year);
  const { data } = await client.get('/moon/phases/year', { params: { year } });
  return data;
}

async function getOneDay(params) {
  if (USE_STUB) return oneDayStub(params);
  const { data } = await client.get('/rstt/oneday', { params });
  return data;
}

async function getSeasons(params) {
  if (USE_STUB) return seasonsStub(params?.year);
  const { data } = await client.get('/seasons', { params });
  return data;
}

module.exports = { getMoonPhasesYear, getOneDay, getSeasons };