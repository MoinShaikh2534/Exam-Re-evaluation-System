const Role = {
    STUDENT: "student",
    CHECKER: "checker",
    CASHIER: "cashier",
};

const RequestStatus = {
    NONE: "",
    PENDING: "pending",
    REJECTED: "rejected",
    RECHECKING: "rechecking",
    RECHECKED: "rechecked",
};
module.exports = {
    Role,
    RequestStatus,
};
