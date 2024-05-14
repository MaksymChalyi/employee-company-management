import React, { useState, useEffect } from "react";
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
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
} from "@mui/material";
import Typography from "components/Typography";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "app/reducers/emloyee";

function Default() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEntityId, setSelectedEntityId] = useState(null);

  const handleDelete = (id) => {
    setSelectedEntityId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Dispatch delete action
    // dispatch(deleteEmployee(selectedEntityId));
    setDeleteDialogOpen(false);
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

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = entities.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            {currentItems.map((entity) => (
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
      <Pagination
        count={Math.ceil(entities.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, value) => paginate(value)}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Entity</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this entity?
        </DialogContent>
        <DialogActions>
          <MuiButton
            onClick={() => setDeleteDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </MuiButton>
          <MuiButton onClick={handleDeleteConfirm} color="primary">
            Confirm
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Default;
