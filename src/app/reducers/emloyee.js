// import {
//   ADD_EMPLOYEE,
//   DELETE_EMPLOYEE,
//   UPDATE_EMPLOYEE,
// } from "../constants/actionTypes";

// const initialState = {
//   employees: [], // Масив для зберігання сутностей співробітників
// };

// const employee = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_EMPLOYEE:
//       return {
//         ...state,
//         employees: [...state.employees, action.payload],
//       };
//     case UPDATE_EMPLOYEE:
//       // Логіка оновлення сутності Employee
//       return state;
//     case DELETE_EMPLOYEE:
//       // Логіка видалення сутності Employee
//       return state;
//     default:
//       return state;
//   }
// };

// export default employee;

import axios from "axios";

const initialState = {
  loading: false,
  employees: [],
  error: "",
};

const FETCH_EMPLOYEES_REQUESTED = "FETCH_EMPLOYEES_REQUESTED";
const FETCH_EMPLOYEES_SUCCEEDED = "FETCH_EMPLOYEES_SUCCEEDED";
const FETCH_EMPLOYEES_FAILED = "FETCH_EMPLOYEES_FAILED";

const fetchUserRequest = () => {
  return {
    type: FETCH_EMPLOYEES_REQUESTED,
  };
};

const fetchUserSuccess = (employees) => {
  return {
    type: FETCH_EMPLOYEES_SUCCEEDED,
    payload: employees,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_EMPLOYEES_FAILED,
    payload: error,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EMPLOYEES_SUCCEEDED:
      return {
        loading: false,
        employees: action.payload,
        error: "",
      };
    case FETCH_EMPLOYEES_FAILED:
      return {
        loading: false,
        employees: [],
        error: action.payload,
      };
    default:
      return state; // Ensure to return the state for any other action type
  }
}

export const fetchEmployees = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:8080/api/employee/all")
      .then((response) => {
        //response.data is the users
        // const users = response.data.map((user) => user.id);
        console.log("response", response);

        dispatch(fetchUserSuccess(response.content));
      })
      .catch((error) => {
        //error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};
