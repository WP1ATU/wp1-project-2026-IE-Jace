jest.mock('../src/services/usno.service', () => ({
  getMoonPhasesYear: jest.fn(async () => ({ apiversion: 'mock', phasedata: [] })),
  getOneDay: jest.fn(async () => ({ sun: { rise: '06:00', set: '20:00' } })),
  getSeasons: jest.fn(async () => ({ data: [] })),
}));

const request = require('supertest');
const { app } = require('../src/server');

describe('Server routes', () => {
  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('GET /api/usno/moon/phases/year returns proxy response', async () => {
    const res = await request(app).get('/api/usno/moon/phases/year').query({ year: 2026 });
    expect(res.status).toBe(200);
    expect(res.body.apiversion).toBe('mock');
    expect(Array.isArray(res.body.phasedata)).toBe(true);
  });

  it('POST /api/locations validates required fields', async () => {
    const res = await request(app).post('/api/locations').send({ label: 'X' });
    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
  });

  it('POST /api/lookups validates kind', async () => {
    const res = await request(app).post('/api/lookups').send({
      kind: 'bad-kind',
      refLabel: 'Test',
      dateOrYear: '2026',
    });
    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
  });
});
