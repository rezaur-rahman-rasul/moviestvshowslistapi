const express = require('express');
const router = express.Router();
const contentsController = require('../../controllers/contentsController');
const ROLES_LIST = require("../../config/roles_list")
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(contentsController.getAllContents)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),contentsController.createNewContent)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),contentsController.updateContent)
    .delete(verifyRoles(ROLES_LIST.Admin),contentsController.deleteContent)

router.route('/:id')
    .get(contentsController.getContent);

module.exports = router;


