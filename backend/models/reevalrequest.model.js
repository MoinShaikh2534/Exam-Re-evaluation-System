const mongoose = require("mongoose");
const { Schema } = mongoose;
const { RequestStatus } = require("../utils/enums");

const ReevalRequestSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    answerSheetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AnswerSheet",
        required: true,
    },
    requestedMarks: [
        {
            questionNumber: Number,
            requestedMarks: Number,
            description: String,
        },
    ],
    status: {
        type: String,
        enum: [
            RequestStatus.PENDING,
            RequestStatus.APPROVED,
            RequestStatus.REJECTED,
            RequestStatus.RECHECKING,
            RequestStatus.COMPLETED,
        ],
        default: RequestStatus.PENDING,
    },
    transactionId: String,
    paymentAmount: Number,
    completionDate: Date,
    assignedFaculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
    },
});

module.exports = mongoose.model("ReevalRequest", ReevalRequestSchema);
