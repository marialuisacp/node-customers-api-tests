const connect = require('../services/db');
const clientCollection = 'clients';
const queryString = require('query-string');
const url = require('url');
const ObjectID = require('mongodb').ObjectID;
const { buildClientsQuerySearch, getLimitClientsRequest } = require('../utils/queries');
const self = this;

self.insertClient = async (req, res) => {
  const db = connect.get();
  let client = (req && req.body) || {};
  let result = {};

  await new Promise((resolve, reject) => {
    return db.collection(clientCollection).insertOne(client, (err, doc) => {
      if (err) {
        console.log('Failed to create new client.');
        reject(err);
      } else {
        console.log('Client created with success.');
        result = doc;
        resolve(result);
      }
    });
  });

  res.status(200).json(result);
};

self.updateClient = async (req, res) => {
  const db = connect.get();
  const clientId = req.params.clientId;
  const updateParams = req.body || {};
  let result = {};

  await new Promise((resolve, reject) => (
    db.collection(clientCollection).updateOne(
      { _id: ObjectID(clientId) },
      { $set: updateParams },
      (err, doc) => {
        if (err) {
          console.log('Failed to update client.');
          reject(err);
        } else {
          console.log('Client updated with success.');
          result = doc;
          resolve(result);
        }
      })
  ));
  res.status(200).json(result);
};

self.getClientById = async (req, res) => {
  const db = connect.get();
  const clientId = req.params.clientId;
  let result = [];

  await new Promise((resolve, reject) => (
    db.collection(clientCollection).findOne(
      ObjectID(clientId),
      {},
      (err, doc) => {
        if (err) {
          console.log('Failed to update client.');
          reject(err);
        } else {
          console.log('Client viewed with success.');
          result = doc;
          resolve(result);
        }
      })
  ));
  res.status(200).json(result);
};

self.getClients = async (req, res) => {
  const db = connect.get();
  let parsedUrl = url.parse(req.originalUrl);
  let queries = queryString.parse(parsedUrl.search) || {};
  let filters = buildClientsQuerySearch(queries);
  let result = [];
  let limitClients = getLimitClientsRequest(queries) || 50;

  await new Promise((resolve) => (
    db.collection(clientCollection).find(filters).sort({ $natural: -1 }).limit(limitClients).toArray(async (err, docs) => {
      if (err) {
        console.log('Failed to get clients.');
        resolve(result);
      } else if (docs) {
        result = docs;
        resolve(result);
      } else {
        resolve();
      }
    })
  ));
  res.status(201).json(result);
};

self.getTotalClients = async (req, res) => {
  const db = connect.get();
  let result = [];

  await new Promise((resolve, reject) => (
    db.collection(clientCollection).countDocuments({}, (err, docs) => {
      if (err) {
        console.log('Failed to get total clients.');
        reject(result);
      } else if (docs) {
        result = { total: docs };
        resolve(result);
      } else {
        resolve();
      }
    })
  ));
  res.status(201).json(result);
};

self.deleteClient = async (req, res) => {
  const db = connect.get();
  const clientId = req.params.clientId;
  let result = {};

  await new Promise((resolve, reject) => (
    db.collection(clientCollection).findOneAndDelete(
      { _id: ObjectID(clientId) },
      (err, doc) => {
        if (err) {
          console.log('Failed to removed client.');
          reject(err);
        } else {
          console.log('Client removed with success.');
          result = doc;
          resolve(result);
        }
      })
  ));
  res.status(200).json(result);
};
