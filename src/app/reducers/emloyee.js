import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../constants/actionTypes";

const initialState = {
  employees: [], // Масив для зберігання сутностей співробітників
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case UPDATE_EMPLOYEE:
      // Логіка оновлення сутності Employee
      return state;
    case DELETE_EMPLOYEE:
      // Логіка видалення сутності Employee
      return state;
    default:
      return state;
  }
};

export default employeeReducer;
