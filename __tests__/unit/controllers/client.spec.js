const sinon = require('sinon');
require('sinon-mongo');
const mongodb = require('mongodb');

const sandbox = require('sinon').createSandbox();
const connect = require('../../../src/services/db');
const client = require('../../../src/controllers/client');
const mockClientObject = require('../../../__mocks__/client.mock').clientObject;

describe('Clients Testing', () => {
  let mockId;
  let mockDb;
  let mockClientCollection;

  before(() => {
    mockId = mongodb.ObjectId();
    mockClientCollection = sinon.mongo.collection({
      insertOne: sinon.stub().callsFake((client, funcResult) => funcResult()),
      updateOne: sinon.stub().callsFake((client, operations, funcResult) => funcResult()),
      findOne: sinon.stub().callsFake((client, operations, funcResult) => funcResult()),
      findOneAndDelete: sinon.stub().callsFake((clientId, funcResult) => funcResult()),
      countDocuments: sinon.stub().callsFake((operations, funcResult) => funcResult()),
      find: sinon.stub().callsFake(() => ({
        sort: () => ({
          limit: () => ({
            toArray: (funcResult) => funcResult()
          })
        })
      })),
    });
    mockDb = sinon.mongo.db({
      clients: mockClientCollection
    });

    sandbox.stub(connect, 'get').returns(mockDb);
  });

  after(() => {
    connect.get.restore();
  });

  it('should call inserting client correctly', async () => {
    const mockReq = { body: mockClientObject };
    const mockRes = {
      status: (status) => ({
        json: (obj) => obj,
      }),
    };

    await client.insertClient(mockReq, mockRes);

    sinon.assert.calledOnce(mockClientCollection.insertOne);
  });

  it('should call updating client correctly', async () => {
    const mockReq = { body: mockClientObject, params: { clientId: mockClientCollection._id } };
    const mockRes = {
      status: (status) => ({
        json: (obj) => obj,
      }),
    };
    await client.updateClient(mockReq, mockRes);
    sinon.assert.calledOnce(mockClientCollection.insertOne);
  });

  it('should call get client by id correctly', async () => {
    const mockReq = { params: { clientId: mockClientCollection._id } };
    const mockRes = {
      status: (status) => ({
        json: (obj) => obj,
      }),
    };
    await client.getClientById(mockReq, mockRes);
    sinon.assert.calledOnce(mockClientCollection.findOne);
  });

  it('should call get total clients counting documents', async () => {
    const mockReq = { originalUrl: '' };
    const mockRes = {
      status: (status) => ({
        json: (obj) => obj,
      }),
    };
    await client.getTotalClients(mockReq, mockRes);
    sinon.assert.calledOnce(mockClientCollection.countDocuments);
  });

  it('should call get clients correctly', async () => {
    const mockReq = { originalUrl: '' };
    const mockRes = {
      status: (status) => ({
        json: (obj) => obj,
      }),
    };
    await client.getClients(mockReq, mockRes);
    sinon.assert.calledOnce(mockClientCollection.find);
  });

  it('should call delete client correctly', async () => {
    const mockReq = { params: { clientId: mockClientCollection._id } };
    const mockRes = {
      status: (status) => ({
        json: (obj) => obj,
      }),
    };
    await client.deleteClient(mockReq, mockRes);
    sinon.assert.calledOnce(mockClientCollection.findOneAndDelete);
  });
});
