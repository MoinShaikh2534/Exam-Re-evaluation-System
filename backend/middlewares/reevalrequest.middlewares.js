const Joi = require("joi");
const { createError, createResponse } = require("../utils/responseHandler");
const ReevalRequest = require("../models/reevalrequest.model");

const reevalRequstBodyValidator = () => {
    const schema = Joi.object({
        student: Joi.string().required(),
        answerSheets: Joi.array().items(Joi.string().required()),
        status: Joi.string().required(),
        transactionId: Joi.string().required(),
        paymentAmount: Joi.number().required(),
        completionDate: Joi.date().required(),
        assignedFaculty: Joi.string().required(),
    });
};
