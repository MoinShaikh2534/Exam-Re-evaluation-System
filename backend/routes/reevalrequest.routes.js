const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const {
    applyReevalRequest,
} = require("../controllers/reevalrequest.controllers");
const upload = require("../config/multerConfig");

router.post("/apply", upload.single("proof"), verifyToken, applyReevalRequest);
module.exports = router;
