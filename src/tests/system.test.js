/* global describe it beforeAll */
import supertest from 'supertest';
import app from '../server';
import config from '../config';
import typeorm from '../typeorm';

const request = supertest(app.server);

describe('/system', () => {
  beforeAll(() => typeorm());

  it('GET /healthz', () => request
    .get('/system/healthz')
    .expect(200));

  it('GET /healthy', () => {
    config.setReadyState(true);
    return request
      .get('/system/healthy')
      .expect(200);
  });

  it('GET /healhy when not ready', () => {
    config.setReadyState(false);
    return request
      .get('/system/healthy')
      .expect(500);
  });
});
