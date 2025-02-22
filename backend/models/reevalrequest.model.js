const mongoose = require("mongoose");
const { Schema } = mongoose;
const { RequestStatus } = require("../utils/enums");

const ReevalRequestSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    answerSheets: [String],
    status: {
        type: String,
        enum: [
            RequestStatus.PENDING,
            RequestStatus.APPROVED,
            RequestStatus.REJECTED,
            RequestStatus.RECHECKING,
            RequestStatus.COMPLETED,
        ],
        default: "pending",
    },
    transactionId: String,
    paymentAmount: Number,
    paymentProof: {
        type: String, // This will store the URL/path of the uploaded image
        required: true,
    },
    completionDate: Date,
    assignedFaculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
    },
});

module.exports = mongoose.model("ReevalRequest", ReevalRequestSchema);
