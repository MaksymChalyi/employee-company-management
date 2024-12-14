// Імпорт констант для actions
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  GET_EMPLOYEES,
  DELETE_EMPLOYEE_SUCCEEDED,
} from "./actionTypes";

// Action creators
export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee,
});

export const getEmployees = (employees) => ({
  type: GET_EMPLOYEES,
  payload: employees,
});

