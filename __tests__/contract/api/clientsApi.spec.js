const { expect } = require('chai');
const supertest = require('supertest');
const joi = require('joi');

const urlAPI = 'http://localhost:8080';
const request = supertest(urlAPI);

const mockToken = 'Basic dGVzdDp0ZXN0IUAjMTIz';
const mockIdUser = '605ea48c1af255c688147f5b';

const joiClientObject = joi.object().keys({
  _id: joi.string(),
  fullname: joi.string(),
  nickname: joi.string().optional().allow(''),
  email: joi.string().optional().allow(''),
  phone: joi.string().optional().allow(''),
});

describe('Clients API Testing', () => {
  it('Get clients function', async () => {
    const schema = joi.array().items(joiClientObject);
    let resultValidation;

    const res = await request
      .get('/clients')
      .set('Authorization', mockToken);

    resultValidation = schema.validate(res.body);

    expect(resultValidation.error).to.not.exist;
    expect(res.status).to.equal(201);
    expect(res.error).to.equal(false);
  });

  it('Get client by id', async () => {
    const schema = joiClientObject;
    let resultValidation;

    const res = await request
      .get(`/client/${mockIdUser}`)
      .set('Authorization', mockToken);

    resultValidation = schema.validate(res.body);

    expect(resultValidation.error).to.not.exist;
    expect(res.status).to.equal(200);
    expect(res.error).to.equal(false);
  });

  it('Get total clients', async () => {
    const schema = joi.object().keys({
      _id: joi.string(),
      total: joi.number()
    });
    let resultValidation;

    const res = await request
      .get('/infoclients')
      .set('Authorization', mockToken);

    resultValidation = schema.validate(res.body);

    expect(resultValidation.error).to.not.exist;
    expect(res.status).to.equal(201);
    expect(res.error).to.equal(false);
  });
});