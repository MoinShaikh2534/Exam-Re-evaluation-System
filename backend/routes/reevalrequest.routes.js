const express = require("express");
const router = express.Router();
const {
    verifyToken,
    authorizeRoles,
} = require("../middlewares/auth.middlewares");
const {
    applyReevalRequest,
} = require("../controllers/reevalrequest.controllers");
const { Role } = require("../utils/enums");

router.post(
    "/apply",
    verifyToken,
    authorizeRoles([Role.STUDENT]),
    applyReevalRequest,
);

// router.post("/approve", verifyToken, authorizeRoles([Role.CASHIER]));
module.exports = router;
