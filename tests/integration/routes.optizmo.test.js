process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/app');
const constants = require('../../src/config/constants').test;

describe('routes : optizmo', () => {

  beforeEach(() => {
  });

  afterEach(() => {
  });

  describe('GET /ping', () => {
    it('should respond to ping request', (done) => {
      chai.request(server)
      .get('/ping')
      .end((err, res) => {
        res.status.should.eql(200);
        res.body.should.eql('pong');
      })
    });
  });

  describe('GET /downloadlink', () => {
    it('should get correct download link', (done) => {
      chai.request(server)
      .get('/downloadlink')
      .end((err, res) => {
        res.status.should.eql(200);
        res.body.should.include.keys('result', 'download_link', 'help');
        res.body.download_link.should.eql(constants.DOWNLOAD_LINK);
      })
    });
  });

});
