// Import library dan file yang diperlukan
const request = require('supertest');
const { expect } = require('chai');
const appUrl = 'https://kasir-api.belajarqa.com';
const { authenticateUser } = require('../helpers/auth');
const { createUnitAndGetId } = require('../helpers/unitHelpers');



let accessToken; // Variabel global untuk menyimpan accessToken
let unitId;

before(async () => {
  try {
    accessToken = await authenticateUser();

    // Membuat unit baru sebagai data uji untuk Get Unit Detail
    unitId = await createUnitAndGetId();

  } catch (error) {
    throw error;
  }

});


describe('Unit Feature Tests', () => {

  describe('GET /units/{unitId} (Positive Scenario)', () => {
    it('should return the unit detail', async () => {
      try {
        const response = await request(appUrl)
          .get(`/units/${unitId}`)
          .set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.data).to.be.an('object');
        expect(response.body.data.unit).to.have.property('name', 'gram');
        expect(response.body.data.unit).to.have.property('description', 'weight measurement');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('GET /units/{unitId} (Negative Scenario)', () => {
    it('should return 404 Not Found for non-existing unit', async () => {
      try {
        const nonExistingUnitId = 'non-existing-unit-id';
        
        const response = await request(appUrl)
          .get(`/units/${nonExistingUnitId}`)
          .set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('id tidak valid');
      } catch (error) {
        throw error;
      }
    });
  });
});
