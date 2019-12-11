import request from 'supertest';
import { expect } from 'chai';
import { app } from '../src/index';

describe('API test export', () => {
  it('GET /api/v1/excel should return a Excel.xlsx', done => {
    request(app)
      .get('/api/v1/excel')
      .expect(200)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.type).to.equal(
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        done();
      });
  });

  it('GET /api/v1/pdf should return a pdf.pdf', done => {
    request(app)
      .get('/api/v1/pdf')
      .expect(200)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.type).to.equal('application/pdf');
        done();
      });
  });
});
