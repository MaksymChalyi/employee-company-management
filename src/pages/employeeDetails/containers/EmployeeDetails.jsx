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
    Button as MuiButton, Stack,
} from "@mui/material";
import Typography from "components/Typography";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import {fetchEmployees} from "app/reducers/emloyee";
import {useNavigate, useParams} from "react-router-dom";
import {useIntl} from "react-intl";

const employee = {
  "id": 2,
      "name": "Elizabeth",
      "age": 29,
      "position": "Software Engineer",
      "experienceYears": 3,
      "interests": [
          "reading",
          "travelling"
  ],
      "company": {
    "id": 1,
        "name": "Google",
        "industry": "Consulting"
  }
}

function EmployeeDetails() {
  const {employees, loading, error} = useSelector(state => state.employee);
    const {id} = useParams();

    const navigate = useNavigate()

  const dispatch = useDispatch();
  const {formatMessage} = useIntl();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [interests, setInterests] = useState([])
  const [company, setCompany] = useState({})


    useEffect(() => {
        if(!loading && !error) {
            const currentEmployee = employees.find(item => item.id == id);
            const {name, age, position, experienceYears} = currentEmployee;
            setFormData({name, age, position, experienceYears})
            setInterests(currentEmployee.interests)
            setCompany(currentEmployee.company)
        }
    }, [loading]);

  // const handleSave = (id) => {
  //   setSelectedEntityId(id);
  //   setDeleteDialogOpen(true);
  // };

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  }

  const handleChangeCompany = (name, value) => {
      setCompany({...company, [name]: value});
  }

  const handleSaveConfirm = () => {
    // Dispatch delete action
    // dispatch(deleteEmployee(selectedEntityId));
    // setDeleteDialogOpen(false);
  };

    const handleSave = () => {
        setSaveDialogOpen(true);
    }

  const handleCancel = () => {
      navigate("/default")
    }

  const handleUpdate = (id) => {
    const updatedEmployee = {};
    // dispatch(updateEmployee(updatedEmployee));
  };


  const handleAdd = () => {
    const newEmployee = {};
    // dispatch(addEmployee(newEmployee));
  };


  if(loading) {
      return <div>Loading</div>
  }

    if(error) {
        return <div>{error}</div>
    }


  return (
    <>
        <Typography variant="h5" gutterBottom align="center">
            <h2>{formatMessage({ id: 'employees.pageTitle' })}</h2>
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
                <Stack spacing={2}>
                    <Typography variant="h3">
                        Employee Details
                    </Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Age"
                        variant="outlined"
                        value={formData.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Experience Years"
                        variant="outlined"
                        value={formData.experienceYears}
                        onChange={(e) => handleChange("experienceYears", e.target.value)}
                        fullWidth
                    />
                    <Grid container spacing={1} columnSpacing={2}>
                        <Grid item sm={7}></Grid>
                        <Grid item sm={2}>
                            <Button variant="outline" onClick={handleSave}>Зберегти</Button>
                        </Grid>
                        <Grid item sm={2}>
                            <Button variant="outline" onClick={handleCancel}>Скасувати</Button>

                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Stack spacing={2}>
                    <Typography variant="h3">
                        Company
                    </Typography>
                    <TextField
                        label="name"
                        variant="outlined"
                        value={company.name}
                        onChange={(e) => handleChangeCompany("name", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="industry"
                        variant="outlined"
                        value={company.industry}
                        onChange={(e) => handleChangeCompany("industry", e.target.value)}
                        fullWidth
                    />
                    <Typography variant="h3">
                        Interests
                    </Typography>
                    {
                        interests.map((item, index) => (<TextField
                            label="Interest"
                            variant="outlined"
                            value={item}
                            onChange={(e) => setInterests(interests.map((_, i) => i === index ? e.target.value : _ ))}
                            fullWidth
                        />))
                    }
                    {
                        interests.length !== 3 && (
                            <Button variant="primary" onClick={() => setInterests([...interests, ""])}>Додати інтерес</Button>
                        )
                    }
                </Stack>
            </Grid>

        </Grid>



      <Dialog
          open={saveDialogOpen}
          onClose={() => setSaveDialogOpen(false)}
      >
        <DialogTitle>{formatMessage({ id: 'dialog.confirmUpdateTitle' })}</DialogTitle>
        <DialogContent>
          {formatMessage({ id: 'dialog.confirmContent' })}
        </DialogContent>
        <DialogActions>
          <MuiButton
              onClick={() => setSaveDialogOpen(false)}
              color="secondary"
          >
            {formatMessage({ id: 'btn.cancel' })}
          </MuiButton>
          <MuiButton onClick={handleSaveConfirm} color="primary">
            {formatMessage({ id: 'btn.confirm' })}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeDetails;
