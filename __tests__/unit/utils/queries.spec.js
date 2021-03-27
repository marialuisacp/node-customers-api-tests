const { assert, expect } = require('chai');
const queries = require('../../../src/utils/queries');

describe('Queries funcionts Testing', () => {
  describe('getClientsQuery', () => {
    it('should build clients query correctly with full name', () => {
      const result = queries.getClientsQuery('fullname', 'value_name');
      const expectResult = { k: 'fullname', v: /value_name/i };
      assert.deepEqual(result, expectResult);
    });

    it('should build clients query correctly with full name initial', () => {
      const result = queries.getClientsQuery('name_initial', 'value_name');
      const expectResult = { k: 'fullname', v: /^value_name/i };
      assert.deepEqual(result, expectResult);
    });

    it('should build clients query correctly with name', () => {
      const result = queries.getClientsQuery('test', 'value_name');
      const expectResult = { k: 'test', v: 'value_name' };
      assert.deepEqual(result, expectResult);
    });
  });

  describe('buildClientsQuerySearch', () => {
    it('should build clients query search', () => {
      const queryString = { phone: '123456', fullname: 'Maria' };
      const result = queries.buildClientsQuerySearch(queryString);
      const expectResult = { phone: '123456', fullname: /Maria/i };
      assert.deepEqual(result, expectResult);
    });
  });

  describe('getLimitClientsRequest', () => {
    it('should build clients query search with fullName filter', () => {
      const queryString = { phone: '123456', fullname: 'Maria' };
      const result = queries.getLimitClientsRequest(queryString);
      expect(result).to.equal(300);
    });

    it('should build clients query search with full name Initial filter', () => {
      const queryString = { name_initial: 'Maria' };
      const result = queries.getLimitClientsRequest(queryString);
      expect(result).to.equal(300);
    });

    it('should build clients query search without full name and full name initial filters', () => {
      const queryString = { phone: '123456' };
      const result = queries.getLimitClientsRequest(queryString);
      expect(result).to.equal(50);
    });
  });
});