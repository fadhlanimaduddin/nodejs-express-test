const express = require('express');
const router = express.Router();
const userController = require('../controllers/personController');

router.get('/', userController.getPersons);
router.get('/:id', userController.getPersonById);
router.post('/', userController.createPerson);
router.put('/:id', userController.updatePerson);
router.delete('/:id', userController.deletePerson);

module.exports = router;
