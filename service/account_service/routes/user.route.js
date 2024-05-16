const express = require('express');
const router = express.Router();

const { getUserById, getUserByUsername, changeInformation, deleteUser } = require('../controller/user.controller');

router.route('/username/:username')
    .get(getUserByUsername)

router.route('/:id')
    .get(getUserById)
    .delete(deleteUser)

router.route('/information/:id')
    .patch(changeInformation)

module.exports = router;

