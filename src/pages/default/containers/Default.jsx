import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
} from "@mui/material";
import Typography from "components/Typography";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "app/reducers/emloyee";
// import { deleteEmployee, updateEmployee, addEmployee } from "./employee";

function Default() {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // dispatch(deleteEmployee(id));
  };

  const handleUpdate = (id) => {
    const updatedEmployee = {};
    // dispatch(updateEmployee(updatedEmployee));
  };

  const handleEntityClick = (id) => {
    // Your logic for showing entity details
  };

  const handleAdd = () => {
    const newEmployee = {};
    // dispatch(addEmployee(newEmployee));
  };

  const handleApplyFilter = () => {
    // Your logic for applying filter
  };

  const entities = useSelector(({ employee }) => employee.employees);
  console.log("employees", entities);
  // useEffect for fetching data when the component mounts
  useEffect(() => {
    // Your logic for fetching initial data
    dispatch(fetchEmployees());
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom align="center">
        <h2>Employees Table</h2>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField label="Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Age" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Position" variant="outlined" fullWidth />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "5px" }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAdd}
          sx={{ marginRight: 1 }}
        >
          Add Employee
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleApplyFilter}
        >
          Apply Filter
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.length > 0 &&
              entities.map((entity) => (
                <TableRow
                  key={entity.id}
                  onClick={() => handleEntityClick(entity.id)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{entity.id}</TableCell>
                  <TableCell>{entity.name}</TableCell>
                  <TableCell>{entity.position}</TableCell>
                  <TableCell>{entity.company.name}</TableCell>
                  <TableCell sx={{ display: "flex", gap: "8px" }}>
                    <Button
                      onClick={() => handleUpdate(entity.id)}
                      colorVariant="secondary"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleDelete(entity.id)}
                      colorVariant="header"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Default;
