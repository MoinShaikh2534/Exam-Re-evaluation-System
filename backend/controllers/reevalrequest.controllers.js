const ReevalRequest = require("../models/reevalrequest.model");
const Student = require("../models/student.model");
const Faculty = require("../models/faculty.model");
const AnswerSheet = require("../models/answersheet.model");
const asyncHandler = require("../utils/asyncHandler");
const { createError, createResponse } = require("../utils/responseHandler");
const { RequestStatus } = require("../utils/enums");
const { MailOptions, sendEmail } = require("../utils/mail");
const { Role } = require("../utils/enums");
const appConfig = require("../config/appConfig");

const applyReevalRequest = asyncHandler(async (req, res) => {
    const {
        studentId,
        answerSheetId,
        paymentAmount,
        transactionId,
        requestedMarks,
    } = req.body;
    if (
        !studentId ||
        !answerSheetId ||
        !paymentAmount ||
        !transactionId ||
        !requestedMarks ||
        requestedMarks.length === 0
    ) {
        throw createError(400, "Insufficient data");
    }
    const existingRequest = await ReevalRequest.findOne({
        answerSheetId,
    });
    if (existingRequest) {
        throw createError(400, "Request already exists");
    }

    const newRequest = new ReevalRequest({
        studentId,
        answerSheetId,
        paymentAmount,
        transactionId,
        status: RequestStatus.PENDING,
    });
    await newRequest.save();
    const answerSheet = await AnswerSheet.findById(answerSheetId);
    answerSheet.status = RequestStatus.PENDING;
    await answerSheet.save();

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
            answerSheetId: newRequest.answerSheetId,
            subject: answerSheet.subject.name,
        }),
    );
});

const approveReevalRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.body;
    if (!requestId) {
        throw createError(400, "Request ID is required");
    }
    const reevalRequest = await ReevalRequest.findById(requestId);
    if (!reevalRequest) {
        throw createError(400, "Request not found");
    }

    const answerSheet = await AnswerSheet.findById(reevalRequest.answerSheetId);
    if (!answerSheet) {
        throw createError(400, "Answer sheet not found");
    }
    answerSheet.status = RequestStatus.RECHECKING;
    await answerSheet.save();

    //getting random faculty, gets array
    const randomFaculty = await Faculty.aggregate([
        { $match: { role: Role.CHECKER } },
        { $sample: { size: 1 } },
    ]);

    const selectedFaculty = randomFaculty[0];

    //assign to random faculty
    reevalRequest.assignedFaculty = selectedFaculty._id;
    reevalRequest.status = RequestStatus.RECHECKING;
    await reevalRequest.save();

    const mailOptions = new MailOptions(
        appConfig.authEmail,
        selectedFaculty.email,
        "Request for Re-evaluation",
        `You have new request for re-evaluation`,
    );
    sendEmail(mailOptions);

    return res.status(201).json(
        createResponse("Request approved successfully!", {
            requestId: reevalRequest._id,
            status: reevalRequest.status,
            answerSheetId: reevalRequest.answerSheetId,
            subject: answerSheet.subject.name,
        }),
    );
});

const rejectReevalRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.body;
    if (!requestId) {
        throw createError(400, "Request ID is required");
    }
    const reevalRequest = await ReevalRequest.findById(requestId);
    if (!reevalRequest) {
        throw createError(400, "Request not found");
    }
    const answerSheet = await AnswerSheet.findById(reevalRequest.answerSheetId);
    if (!answerSheet) {
        throw createError(400, "Answer sheet not found");
    }
    answerSheet.status = RequestStatus.REJECTED;
    await answerSheet.save();

    const student = await Student.findById(reevalRequest.studentId);
    const mailOptions = new MailOptions(
        appConfig.authEmail,
        student.email,
        "Request for Re-evaluation",
        `Your request for re-evaluation has been rejected.`,
    );
    sendEmail(mailOptions);

    await ReevalRequest.findByIdAndDelete(requestId);

    return res.status(201).json(
        createResponse("Request rejected successfully!", {
            requestId: reevalRequest._id,
            status: reevalRequest.status,
            answerSheetId: reevalRequest.answerSheetId,
            subject: answerSheet.subject.name,
        }),
    );
});

const getAllReevalRequests = asyncHandler(async (req, res) => {
    const reevalRequests = await ReevalRequest.find({
        status: RequestStatus.PENDING,
    }).populate("studentId answerSheetId");
    return res
        .status(200)
        .json(
            createResponse(
                "All reeval requests fetched successfully!",
                reevalRequests,
            ),
        );
});

const getAssignedRequests = asyncHandler(async (req, res) => {
    const reevalRequests = await ReevalRequest.find({
        assignedFaculty: req.user._id,
    }).populate("answerSheetId studentId");

    return res
        .status(200)
        .json(
            createResponse(
                "All assigned requests fetched successfully!",
                reevalRequests,
            ),
        );
});

const submitRecheckedMarks = asyncHandler(async (req, res, next) => {
    const { requestId, reevaluatedMarks } = req.body;
    if (!requestId || !reevaluatedMarks) {
        throw createError(400, "Request ID and rechecked marks are required");
    }
    const reevalRequest = await ReevalRequest.findById(requestId);
    if (!reevalRequest) {
        throw createError(400, "Request not found");
    }

    // Find and update answer sheet
    const answerSheet = await AnswerSheet.findById(reevalRequest.answerSheetId);
    if (!answerSheet) {
        throw createError(400, "Answer sheet not found");
    }

    answerSheet.reevaluatedMarks = reevaluatedMarks;

    // Calculate total reevaluated marks
    answerSheet.reevaluatedTotal = reevaluatedMarks.reduce(
        (total, mark) => total + mark.marksObtained,
        0,
    );

    // Mark as reevaluated
    answerSheet.reevaluated = true;
    answerSheet.status = RequestStatus.RECHECKED;
    await answerSheet.save();

    reevalRequest.status = RequestStatus.RECHECKED;
    reevalRequest.completionDate = new Date();
    await reevalRequest.save();

    const student = await Student.findById(reevalRequest.studentId);
    const mailOptions = new MailOptions(
        appConfig.authEmail,
        student.email,
        "Re-evaluation Completed",
        `Hi ${student.name},
        Your answer sheet has been re-evaluated.
        Original Total: ${answerSheet.totalObtained}
        Re-evaluated Total: ${answerSheet.reevaluatedTotal}`,
    );
    await sendEmail(mailOptions);

    return res.status(200).json(
        createResponse("Marks submitted successfully!", {
            requestId: reevalRequest._id,
            status: reevalRequest.status,
            reevaluatedMarks: answerSheet.reevaluatedMarks,
            reevaluatedTotal: answerSheet.reevaluatedTotal,
        }),
    );
});

module.exports = {
    applyReevalRequest,
    approveReevalRequest,
    getAllReevalRequests,
    getAssignedRequests,
    rejectReevalRequest,
    submitRecheckedMarks,
};
