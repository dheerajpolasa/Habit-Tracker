const express = require('express');
const bodyParser = require('body-parser');
const homeController = require('../controllers/home_controller');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.get('/', homeController.home);
router.use('/habit', require('./habits'));

module.exports = router;