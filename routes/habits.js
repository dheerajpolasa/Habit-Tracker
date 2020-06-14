const express = require('express');
const bodyParser = require('body-parser');
const habitController = require('../controllers/habit_controller');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.post('/create', habitController.create);
router.post('/tasks', habitController.dayTasks);
router.get('/destroy/:id', habitController.destroy);
router.get('/edit/:id', habitController.edit);
router.post('/update/:id', habitController.update);

module.exports = router;