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
const upload = require("../config/multerConfig");

router.post(
    "/apply",
    upload.single("proof"),
    verifyToken,
    authorizeRoles([Role.STUDENT]),
    applyReevalRequest,
);

module.exports = router;
