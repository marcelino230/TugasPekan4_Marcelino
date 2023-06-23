const request = require('supertest');
const appUrl = 'https://kasir-api.belajarqa.com';

async function authenticateUser() {
  try {
    const loginResponse = await request(appUrl)
      .post('/authentications')
      .send({
        email: 'jahecel@gmail.com',
        password: '@Vian00',
      });

    return loginResponse.body.data.accessToken;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  authenticateUser,
};
