const mongoose = require("mongoose");
const { Schema } = mongoose;
const { RequestStatus } = require("../utils/enums");

const AnswerSheetSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    fileUniqueName: {
        type: String,
        required: true,
    },
    subject: {
        code: String,
        name: String,
    },
    pdfPath: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [
            RequestStatus.NONE,
            RequestStatus.PENDING,
            RequestStatus.REJECTED,
            RequestStatus.RECHECKING,
            RequestStatus.RECHECKED,
        ],
        default: RequestStatus.NONE,
    },
    questionMarks: [
        {
            questionNumber: Number,
            marksObtained: Number,
            maxMarks: Number,
        },
    ],
    totalObtained: Number,
    totalMaxMarks: Number,
    reevaluatedMarks: [
        {
            questionNumber: Number,
            marksObtained: Number,
            maxMarks: Number,
        },
    ],
    reevaluatedTotal: Number,
    reevaluated: Boolean,
});

module.exports = mongoose.model("AnswerSheet", AnswerSheetSchema);
