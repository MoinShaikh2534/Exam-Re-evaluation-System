import React from "react";
import EvaluatorDashboard from "../pages/EvaluatorDashboard";
import Cashier from "../pages/Cashier";
import { Role } from "../../utils/enums";

const FacultyDashboard = ({ userRole }) => {
  return (
    <div>
      {userRole === Role.CHECKER && <EvaluatorDashboard  />}
      {userRole === Role.CASHIER && <Cashier />}
      {userRole === Role.STUDENT && <div className="text-center mt-10 text-lg">You do not have access to this dashboard.</div>}
    </div>
  );
};

export default FacultyDashboard;
