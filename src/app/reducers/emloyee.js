import {
  FETCH_EMPLOYEES_REQUESTED,
  FETCH_EMPLOYEES_SUCCEEDED,
  FETCH_EMPLOYEES_FAILED,
  DELETE_EMPLOYEE_SUCCEEDED,
  FETCH_ADD_EMPLOYEE_REQUESTED,
  FETCH_ADD_EMPLOYEE_SUCCEEDED,
  FETCH_ADD_EMPLOYEE_FAILED,
  FETCH_UPDATE_EMPLOYEE_FAILED,
  FETCH_UPDATE_EMPLOYEE_SUCCEEDED,
  FETCH_UPDATE_EMPLOYEE_REQUESTED,
  CLEAR_LAST_CREATED,
  DELETE_EMPLOYEE_REQUESTED, DELETE_EMPLOYEE_FAILED,
} from "../constants/actionTypes";

import axios from "axios";

const initialState = {
  loading: false,
  employees: [],
  lastCreated: {},
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
export const clearLastCreated = () => {
  return {
    type: CLEAR_LAST_CREATED
  }
}
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

const deleteEmployeeRequest = () => {
  return {
    type: DELETE_EMPLOYEE_REQUESTED
  }
}

const deleteEmployeeSuccess = (id) => {
  return {
    type: DELETE_EMPLOYEE_SUCCEEDED,
    payload: id
  }
}
const deleteEmployeeFailure = (error) => {
  return {
    type: DELETE_EMPLOYEE_FAILED,
    payload: error
  }
}


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
        lastCreated: action.payload,
        error: "",
      };
    case FETCH_ADD_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_LAST_CREATED:
      return {
        ...state,
        lastCreated: {}
      }
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
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case DELETE_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload),
      };
    case DELETE_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state; // Ensure to return the state for any other action type
  }
}

export const fetchEmployees = (page = 0) => {
  return async function  (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:8080/api/employee/all", {
        params: {
          page
        }
      })
      .then(async (response) => {
        //response.data is the users
        // const users = response.data.map((user) => user.id);
        console.log("response", response);
        if(response.message) {
          dispatch(fetchUsersFailure(response.message));
        }
        await dispatch(fetchUserSuccess(response));
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
          dispatch(fetchUpdateEmployeeSuccess(id));
        })
        .catch((error) => {
          //error.message is the error message
          dispatch(fetchUpdateEmployeeFailure(error.message));
        });
  };
};

export const deleteEmployee = (id) => {
  return function (dispatch) {
    dispatch(deleteEmployeeRequest());
    axios
        .delete("http://localhost:8080/api/employee/" + id)
        .then((response) => {
          console.log("response", response);
          dispatch(deleteEmployeeSuccess(id));
        })
        .catch((error) => {
          //error.message is the error message
          dispatch(deleteEmployeeFailure(error.message));
        });
  };
};

