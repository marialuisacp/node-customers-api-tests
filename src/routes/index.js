const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');

router.get('/', (req, res) => {
  res.send('welcome Customers API!');
});

router.get('/clients', clientController.getClients);
router.post('/client', clientController.insertClient);
router.get('/client/:clientId', clientController.getClientById);
router.put('/client/:clientId', clientController.updateClient);
router.delete('/client_delete/:clientId', clientController.deleteClient);
router.get('/infoclients', clientController.getTotalClients);

module.exports = router;