const express = require('express');
const router = express.Router();
const crewsController = require('../../controllers/crewsController');

router.route('/')
    .get(crewsController.getAllCrews)
    .post(crewsController.createNewCrew)
    .put(crewsController.updateCrew)
    .delete(crewsController.deleteCrew)

router.route('/:id')
    .get(crewsController.getCrew);

module.exports = router;