import {
  FETCH_EMPLOYEES_REQUESTED,
  FETCH_EMPLOYEES_SUCCEEDED,
  FETCH_EMPLOYEES_FAILED,
  DELETE_EMPLOYEE_SUCCEEDED,
  FETCH_ADD_EMPLOYEE_REQUESTED,
  FETCH_ADD_EMPLOYEE_SUCCEEDED,
  FETCH_ADD_EMPLOYEE_FAILED,
  FETCH_UPDATE_EMPLOYEE_FAILED, FETCH_UPDATE_EMPLOYEE_SUCCEEDED, FETCH_UPDATE_EMPLOYEE_REQUESTED,
} from "../constants/actionTypes";

import axios from "axios";

const initialState = {
  loading: false,
  employees: [],
  totalCount: 0,
  error: "",
};

const fetchUserRequest = () => {
  return {
    type: FETCH_EMPLOYEES_REQUESTED,
  };
};

const fetchUserSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEES_SUCCEEDED,
    payload: response,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_EMPLOYEES_FAILED,
    payload: error,
  };
};

const fetchAddEmployeeRequest = () => {
  return {
    type: FETCH_ADD_EMPLOYEE_REQUESTED,
  };
};

const fetchAddEmployeeSuccess = (employee) => {
  return {
    type: FETCH_ADD_EMPLOYEE_SUCCEEDED,
    payload: employee,
  };
};

const fetchAddEmployeeFailure = (error) => {
  return {
    type: FETCH_ADD_EMPLOYEE_FAILED,
    payload: error,
  };
};
const fetchUpdateEmployeeRequest = () => {
  return {
    type: FETCH_UPDATE_EMPLOYEE_REQUESTED,
  };
};

const fetchUpdateEmployeeSuccess = (employee) => {
  return {
    type: FETCH_UPDATE_EMPLOYEE_SUCCEEDED,
    payload: employee,
  };
};

const fetchUpdateEmployeeFailure = (error) => {
  return {
    type: FETCH_UPDATE_EMPLOYEE_FAILED,
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
      console.log("action")
      console.log(action.payload)
      return {
        loading: false,
        employees: [...state.employees, ...action.payload.content],
        totalCount: action.payload.totalElements,
        error: ""
      };
    case FETCH_EMPLOYEES_FAILED:
      return {
        ...state,
        loading: false,
        employees: [],
        error: action.payload,
      };
    case FETCH_ADD_EMPLOYEE_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ADD_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        loading: false,
        employees: [...state.employees, action.payload],
        error: "",
      };
    case FETCH_ADD_EMPLOYEE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case FETCH_UPDATE_EMPLOYEE_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_UPDATE_EMPLOYEE_SUCCEEDED:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        employees: state.employees.map((item => item.id === action.payload.id ? action.payload : item)),
        error: "",
      };
    case FETCH_UPDATE_EMPLOYEE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload),
      };
    default:
      return state; // Ensure to return the state for any other action type
  }
}

export const fetchEmployees = (page = 0) => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:8080/api/employee/all", {
        params: {
          page
        }
      })
      .then((response) => {
        //response.data is the users
        // const users = response.data.map((user) => user.id);
        console.log("response", response);

        dispatch(fetchUserSuccess(response));
      })
      .catch((error) => {
        //error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const fetchAddEmployee = (employee) => {
  return function (dispatch) {
    dispatch(fetchAddEmployeeRequest());
    axios
        .post("http://localhost:8080/api/employee", employee)
        .then((response) => {
          console.log("response", response);
          dispatch(fetchAddEmployeeSuccess(response));
        })
        .catch((error) => {
          //error.message is the error message
          dispatch(fetchAddEmployeeFailure(error.message));
        });
  };
};

export const fetchUpdateEmployee = (id, employee) => {
  return function (dispatch) {
    dispatch(fetchUpdateEmployeeRequest());
    axios
        .put("http://localhost:8080/api/employee/" + id, employee)
        .then((response) => {
          console.log("response", response);
          dispatch(fetchUpdateEmployeeSuccess(response));
        })
        .catch((error) => {
          //error.message is the error message
          dispatch(fetchUpdateEmployeeFailure(error.message));
        });
  };
};

