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
import { useIntl } from "react-intl";

function Default() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEntityId, setSelectedEntityId] = useState(null);
  const { formatMessage } = useIntl();

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
  }, [dispatch]);

  return (
      <>
        <Typography variant="h5" gutterBottom align="center">
          <h2>{formatMessage({ id: 'employees.tableTitle' })}</h2>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
                label={formatMessage({ id: 'field.name' })}
                variant="outlined"
                fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
                label={formatMessage({ id: 'field.age' })}
                variant="outlined"
                fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
                label={formatMessage({ id: 'field.position' })}
                variant="outlined"
                fullWidth
            />
          </Grid>
        </Grid>
        <div
            style={{ display: "flex", justifyContent: "flex-end", margin: "5px", gap: "8px" }}
        >
          <Button
              variant="contained"
              color="secondary"
              onClick={handleAdd}
          >
            {formatMessage({ id: 'btn.addEmployee' })}
          </Button>
          <Button
              variant="contained"
              color="secondary"
              onClick={handleApplyFilter}
          >
            {formatMessage({ id: 'btn.applyFilter' })}
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>
                    {formatMessage({ id: 'employee.id' })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {formatMessage({ id: 'employee.name' })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {formatMessage({ id: 'employee.position' })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {formatMessage({ id: 'company.name' })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {formatMessage({ id: 'employee.actions' })}
                  </Typography>
                </TableCell>
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
                        {formatMessage({ id: 'btn.update' })}
                      </Button>
                      <Button
                          onClick={() => handleDelete(entity.id)}
                          colorVariant="header"
                      >
                        {formatMessage({ id: 'btn.delete' })}
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
          <DialogTitle>{formatMessage({ id: 'dialog.deleteTitle' })}</DialogTitle>
          <DialogContent>
            {formatMessage({ id: 'dialog.deleteContent' })}
          </DialogContent>
          <DialogActions>
            <MuiButton
                onClick={() => setDeleteDialogOpen(false)}
                color="secondary"
            >
              {formatMessage({ id: 'btn.cancel' })}
            </MuiButton>
            <MuiButton onClick={handleDeleteConfirm} color="primary">
              {formatMessage({ id: 'btn.confirm' })}
            </MuiButton>
          </DialogActions>
        </Dialog>
      </>
  );
}

export default Default;
