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

    // Membuat unit baru sebagai data uji untuk Update Unit
    unitId = await createUnitAndGetId();

  } catch (error) {
    throw error;
  }

});

describe('Unit Feature Tests', () => {

  describe('PUT /units/{unitId} (Positive Scenario)', () => {
    it('should update the unit', async () => {
      try {
        const updatedUnitData = {
          name: 'update-meter',
          description: 'no-meter',
        };

        const response = await request(appUrl)
          .put(`/units/${unitId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(updatedUnitData);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.data).to.be.an('object');
        expect(response.body.data).to.have.property('name', 'update-meter');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('PUT /units/{unitId} (Negative Scenario)', () => {
    it('should return 404 Not Found for non-existing unit', async () => {
      try {
        const nonExistingUnitId = 'non-existing-unit-id';

        const updatedUnitData = {
          name: 'update-meter',
          description: 'no-meter',
        };

        const response = await request(appUrl)
          .put(`/units/${nonExistingUnitId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(updatedUnitData);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('id tidak valid');
      } catch (error) {
        throw error;
      }
    });

    it('should return 400 Bad Request for invalid data', async () => {
        try {
          const updatedUnitData = {
            name: 12345, // Data yang tidak valid, harusnya string
            description: 'no-meter',
          };
    
          const response = await request(appUrl)
            .put(`/units/${unitId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedUnitData);
    
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('name is required, description is optional');
        } catch (error) {
          throw error;
        }
    });
  });
});
