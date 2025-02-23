const express = require("express");
const router = express.Router();
const {
    verifyToken,
    authorizeRoles,
} = require("../middlewares/auth.middlewares");
const {
    applyReevalRequest,
    approveReevalRequest,
    getAllReevalRequests,
    getAssignedRequests,
    rejectReevalRequest,
} = require("../controllers/reevalrequest.controllers");
const { Role } = require("../utils/enums");

router.post(
    "/apply",
    verifyToken,
    authorizeRoles([Role.STUDENT]),
    applyReevalRequest,
);

//for cashier, show in table
router.get(
    "/all",
    verifyToken,
    authorizeRoles([Role.CASHIER]),
    getAllReevalRequests,
);

router.get(
    "/get-assigned-requests",
    verifyToken,
    authorizeRoles([Role.CHECKER]),
    getAssignedRequests,
);

router.post(
    "/approve",
    verifyToken,
    authorizeRoles([Role.CASHIER]),
    approveReevalRequest,
);

router.post(
    "/reject",
    verifyToken,
    authorizeRoles([Role.CASHIER]),
    rejectReevalRequest,
);
module.exports = router;
