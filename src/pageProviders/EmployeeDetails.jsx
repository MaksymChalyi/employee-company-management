import EmployeeDetailsPage from "pages/employeeDetails";
import React from "react";

import PageContainer from "./components/PageContainer";

const EmployeeDetails = (props) => {
  return (
    <PageContainer>
      <EmployeeDetailsPage {...props} />
    </PageContainer>
  );
};

export default EmployeeDetails;
