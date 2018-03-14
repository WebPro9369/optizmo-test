process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();

const helpers = require('../../src/routes/_helpers');
const constants = require('../../src/config/constants').test;

describe('optizmo : helpers', () => {

  describe('fetchDownloadLink()', () => {
    it('should get correct download link', (done) => {
      const response = await helpers.fetchDownloadLink();
      should.exist(response);
      response.should.include.keys('result', 'download_link', 'help');
      response.download_link.should.eql(constants.DOWNLOAD_LINK);
      done();
    });
  });
  
  describe('downloadFile()', () => {
    const file = await helpers.downloadFile();
    should.exist(file);
    done();
  });
});
