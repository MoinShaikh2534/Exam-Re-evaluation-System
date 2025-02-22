const ReevalRequest = require("../models/reevalrequest.model");
const Student = require("../models/student.model");
const asyncHandler = require("../utils/asyncHandler");
const { createError, createResponse } = require("../utils/responseHandler");
const { RequestStatus } = require("../utils/enums");
const { MailOptions, sendEmail } = require("../utils/mail");
const appConfig = require("../config/appConfig");

const applyReevalRequest = asyncHandler(async (req, res) => {
    const { studentId, answerSheets, paymentAmount, transactionId } = req.body;
    if (!studentId || !answerSheets || !paymentAmount || !transactionId) {
        throw createError(400, "Insufficient data");
    }
    const existingRequest = await ReevalRequest.findOne({
        student: studentId,
    });
    if (existingRequest) {
        throw createError(400, "Request already exists");
    }

    const newRequest = new ReevalRequest({
        student: studentId,
        answerSheets,
        paymentAmount,
        transactionId,
        status: RequestStatus.PENDING,
        paymentProof: req.file.filename,
    });
    await newRequest.save();
    const student = await Student.findById(studentId);
    student.appliedForReevaluation = true;
    await student.save();
    const mailOptions = new MailOptions(
        appConfig.authEmail,
        student.email,
        "Request for Re-evaluation",
        `Hi ${student.name}, 
        Your request for re-evaluation has been received.`,
    );
    await sendEmail(mailOptions);

    return res.status(201).json(
        createResponse("Request submitted successfully!", {
            requestId: newRequest._id,
            studentName: student.name,
            status: newRequest.status,
        }),
    );
});

module.exports = { applyReevalRequest };
