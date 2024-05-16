import React, {useEffect, useState} from "react";
import {
  Alert,
  AlertTitle,
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Typography from "components/Typography";
import Button from "components/Button";
import {useDispatch, useSelector} from "react-redux";
import {deleteEmployee, fetchEmployees} from "app/reducers/emloyee";
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";
import {TrashIcon} from "@radix-ui/react-icons";
import IconButton from "../../../components/IconButton";

function Default() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEntityId, setSelectedEntityId] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const { formatMessage } = useIntl();

  useEffect(() =>{
    setName(localStorage.getItem("name") || "");
    setAge(localStorage.getItem("age") || "");
    setPosition(localStorage.getItem("position") || "");
    setCurrentPage(parseInt(localStorage.getItem("currentPage")) || 1);
  }, []);

  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);
    localStorage.setItem("position", position);
    localStorage.setItem("currentPage", currentPage)
  }, [currentPage, name, age, position]);

  const handleDelete = (id) => {
    setSelectedEntityId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Dispatch delete action
    dispatch(deleteEmployee(selectedEntityId))
    setDeleteDialogOpen(false);
  };

  const handleEntityClick = (id) => {
    navigate("/employeeDetails/" + id)
  };

  const handleAdd = () => {
     navigate("/employeeDetails/")
  };

  const handleApplyFilter = () => {
    // Your logic for applying filter
  };

  const entities = useSelector(({ employee }) => employee.employees);
  const totalCount = useSelector(({ employee }) => employee.totalCount);
  const error = useSelector(({ employee }) => employee.error);


  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  if(entities && entities.length > 0) {
    if(entities.length <= indexOfLastItem) {
      if (entities.length < totalCount) {
        dispatch(fetchEmployees(currentPage))
      }
    }
  }

  const currentItems = entities.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
      <>
        <Typography variant="h5" gutterBottom align="center">
          <h2>{formatMessage({ id: 'employees.tableTitle' })}</h2>
        </Typography>
        <Grid container spacing={2}>
          {
              error && (
                  <Grid item sm={12}>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
                  </Grid>
              )
          }
          <Grid item xs={12} sm={4}>
            <TextField
                label={formatMessage({ id: 'field.name' })}
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
                label={formatMessage({ id: 'field.age' })}
                variant="outlined"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
                label={formatMessage({ id: 'field.position' })}
                variant="outlined"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
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
                      style={{ cursor: "pointer" }}>
                      <TableCell>{entity.id}</TableCell>
                    <TableCell>{entity.name}</TableCell>
                      <TableCell>{entity.position}</TableCell>
                      <TableCell>{entity.company?.name}</TableCell>
                    <TableCell sx={{ display: "flex", gap: "8px" }}>
                      <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(entity.id)
                          }}
                          colorVariant="secondary"
                      >
                        <TrashIcon width={25} height={25} />
                      </IconButton>
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
