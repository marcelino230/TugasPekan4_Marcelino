const request = require('supertest');
const appUrl = 'https://kasir-api.belajarqa.com';
const { authenticateUser } = require('./auth');

let accessToken;
let unitId;

async function createUnitAndGetId() {
  try {
    accessToken = await authenticateUser();

    const unitData = {
      name: 'gram',
      description: 'weight measurement',
    };

    const createResponse = await request(appUrl)
      .post('/units')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(unitData);

    unitId = createResponse.body.data.unitId;

    return unitId;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUnitAndGetId,
};
