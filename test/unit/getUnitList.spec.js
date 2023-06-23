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

  describe('GET /units (Positive Scenario)', () => {
    it('should return a list of units', async () => {
      try {
        let query1 = 'gram';
        let query2 = 1;
        // Menjalankan permintaan GET dengan Supertest ke endpoint '/units'
        const response = await request(appUrl)
          .get('/units')
          .set('Authorization', `Bearer ${accessToken}`)
          .query({ q: query1, page: query2 });
  
        // Memeriksa respons JSON untuk memastikan daftar unit telah dikembalikan
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success'); // Memeriksa status sukses
        expect(response.body.data.units).to.be.an('array'); // Memeriksa bahwa units adalah sebuah array
      } catch (error) {
        throw error;
      }
    });
  });


  describe('GET /units (Negative Scenario)', () => {
    it('should return 401 Unauthorized without access token', async () => {
      try {
        // Menjalankan permintaan GET tanpa access token
        const response = await request(appUrl).get('/units');
  
        // Memeriksa respons JSON untuk memastikan status 401 Unauthorized
        expect(response.status).to.equal(401);
        expect(response.body.statusCode).to.equal(401); // Memeriksa status code 401
        expect(response.body.message).to.equal('Missing authentication'); // Memeriksa pesan kesalahan
      } catch (error) {
        throw error;
      }
    });
  });
});
