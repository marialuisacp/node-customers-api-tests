const { assert, stub, spy, mongo } = require('sinon');
require('sinon-mongo');
const { expect } = require('chai');

const dbService = require('../../../src/services/db');
const { MongoClient } = require('mongodb');
const mockValueDone = '123';
const mockDone = () => mockValueDone;
const mockDoneWithError = (e) => e;
const mockErrorMessage = 'error message';
const mockUrl = 'mongodb://0.0.0.0:1234/db_name_test';

const mockMongoClient = mongo.mongoClient();

mockMongoClient.connectWithSuccess = (url, callback) => {
  return callback(null, mockMongoClient);
};

mockMongoClient.connectWithError = (url, callback) => {
  return callback(mockErrorMessage, null);
};

describe('MongoDB Testing', () => {
  it('should return DB correctly when exists db object', async () => {
    stub(dbService, 'state').value({ db: true });
    const result = await dbService.connect(mockUrl, mockDone);
    expect(result).to.equal(mockValueDone);
  });

  it('should connect successfully DB when does not exists db object', async () => {
    stub(dbService, 'state').value({ db: false });

    stub(MongoClient, 'connect').value(mockMongoClient.connectWithSuccess);
    const result = await dbService.connect(mockUrl, mockDone);
    expect(result).to.equal(mockValueDone);
  });

  it('should return error in connection DB when does not exists db object', async () => {
    stub(dbService, 'state').value({ db: false });

    stub(MongoClient, 'connect').value(mockMongoClient.connectWithError);
    const result = await dbService.connect(mockUrl, mockDoneWithError);
    expect(result).to.equal(mockErrorMessage);
  });

  it('should get DB correctly', async () => {
    const mockDB = 'DataBase';
    stub(dbService, 'state').value({ db: mockDB });
    const result = await dbService.get();
    expect(result).to.equal(mockDB);
  });

  it('should close DB connect correctly', async () => {
    const mockCloseDB = spy();
    stub(dbService, 'state').value({
      db: {
        close: (callback) => callback(null, mockValueDone)
      }
    });
    await dbService.close(mockCloseDB);
    assert.calledOnceWithExactly(mockCloseDB, mockValueDone);
  });

  it('should close DB connect with error', async () => {
    const mockCloseDB = spy();
    stub(dbService, 'state').value({
      db: {
        close: (callback) => callback(mockErrorMessage, null)
      }
    });
    await dbService.close(mockCloseDB);
    assert.calledOnceWithExactly(mockCloseDB, mockErrorMessage);
  });

  it('should close DB when does not exists db object', async () => {
    const mockCloseDB = spy();
    stub(dbService, 'state').value({
      db: null
    });
    await dbService.close(mockCloseDB);
    assert.notCalled(mockCloseDB);
  });
});