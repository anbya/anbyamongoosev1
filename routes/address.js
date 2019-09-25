const express = require('express')

const router = express.Router()

const {addAddress} = require("../controllers/address")
router.post("/", addAddress);
module.exports = router;