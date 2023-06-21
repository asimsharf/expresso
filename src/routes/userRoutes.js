const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authenticator');

router.post('/', authenticate, authorize(['admin']), userController.createUser);
router.get('/', authenticate, authorize(['admin']), userController.getAllUsers);
router.get('/:id', authenticate, authorize(['admin', 'user']), userController.getUserById);
router.put('/:id', authenticate, authorize(['admin', 'user']), userController.updateUser);
router.delete('/:id', authenticate, authorize(['admin']), userController.deleteUser);

module.exports = router;