const express = require("express");
const router = express.Router();
const upload = require("../middlewares/answersheet.middlewares");
const {
    uploadAnswerSheet,
    downloadAnswerSheet,
    calculateTotalMarks,
    updateTotalMarks,
    deleteAnswerSheet,
    getAllAnswerSheets,
} = require("../controllers/answersheet.controllers");
const {
    verifyToken,
    authorizeRoles,
} = require("../middlewares/auth.middlewares");
const { Role } = require("../utils/enums");

// Route to get result by student ID
router.get(
    "/result/:studentId",
    verifyToken,
    authorizeRoles([Role.STUDENT]),
    calculateTotalMarks,
);

// Route to update total marks after adding question-wise marks
router.put("/update-marks/:fileUniqueName", updateTotalMarks);

// Upload a new answer sheet
router.post("/upload", upload.single("pdfFile"), uploadAnswerSheet);

// Download an answer sheet by ID
router.get(
    "/download/:fileUniqueName",
    verifyToken,
    authorizeRoles([Role.STUDENT]),
    downloadAnswerSheet,
);

// Delete an answer sheet (Optional)
router.delete("/delete/:id", deleteAnswerSheet);

router.post(
    "/all",
    verifyToken,
    authorizeRoles([Role.STUDENT]),
    getAllAnswerSheets,
);

module.exports = router;
