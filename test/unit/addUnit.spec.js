// Import library dan file yang diperlukan
const request = require('supertest');
const { expect } = require('chai');
const appUrl = 'https://kasir-api.belajarqa.com';
const { authenticateUser } = require('../helpers/auth');


let accessToken; // Variabel global untuk menyimpan accessToken

before(async () => {
  try {
    accessToken = await authenticateUser();
  } catch (error) {
    throw error;
  }
});

describe('Unit Feature Tests', () => {

  describe('POST /units  (Positive Scenario)', () => {
    it('should add a new unit', async () => {
      try {
        const unitData = {
          name: 'gram',
          description: 'weight measurement',
        };

        const response = await request(appUrl)
          .post('/units')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(unitData);

        expect(response.status).to.equal(201); // Memeriksa status code 201 (Created)
        expect(response.body.status).to.equal('success'); // Memeriksa status sukses
        expect(response.body.data).to.be.an('object'); // Memeriksa bahwa data adalah sebuah objek
        expect(response.body.data).to.have.property('unitId'); // Memeriksa apakah id unit ada dalam respons
        expect(response.body.data.name).to.equal(unitData.name); // Memeriksa apakah nama unit sesuai dengan yang dikirimkan

      } catch (error) {
        throw error;
      }
    });

  });


    describe('POST /units (Negative Scenario)', () => {

        it('should return 401 Unauthorized without access token', async () => {
            try {
              const unitData = {
                name: 'gram',
                description: 'weight measurement',
              };
      
              const response = await request(appUrl)
                .post('/units')
                .send(unitData);
      
              expect(response.status).to.equal(401); // Memeriksa status code 401 (Unauthorized)
              expect(response.body.statusCode).to.equal(401); // Memeriksa status code 401 dalam body respons
              expect(response.body.message).to.equal('Missing authentication'); // Memeriksa pesan kesalahan
            } catch (error) {
              throw error;
            }
          });

        it('should return 400 Bad Request with missing fields', async () => {
          try {
            const response = await request(appUrl)
              .post('/units')
              .set('Authorization', `Bearer ${accessToken}`)
              .send({});
      
            expect(response.status).to.equal(400); // Memeriksa status code 400 (Bad Request)
            expect(response.body.message).to.equal('name is required, description is optional'); // Memeriksa pesan kesalahan
          } catch (error) {
            throw error;
          }
        });
      });

});
