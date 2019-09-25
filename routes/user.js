const express = require('express')

const router = express.Router()

const {addUser,getAll,getOne,update,hapus,getUserAddress} = require("../controllers/user")

router.get("/", getAll);
router.get("/byaddress", getUserAddress);
router.get("/id", getOne);
router.post("/", addUser);
router.put("/", update);
router.delete("/", hapus);

module.exports = router;