import React, {useEffect, useRef, useState} from "react";
import {
    Button as MuiButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    TextField,
} from "@mui/material";
import Typography from "components/Typography";
import Button from "components/Button";
import {useDispatch, useSelector} from "react-redux";
import {fetchAddEmployee, fetchUpdateEmployee} from "app/reducers/emloyee";
import {useNavigate, useParams} from "react-router-dom";
import {useIntl} from "react-intl";
import {Pencil1Icon} from "@radix-ui/react-icons";
import IconButton from "../../../components/IconButton";

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
  const {employees, loading, error} = useSelector(state => state.employee)
  const {id} = useParams();

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const {formatMessage} = useIntl();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [edit, setEdit] = useState(!id);
  const [formData, setFormData] = useState({});
  const [interests, setInterests] = useState([""])
  const [company, setCompany] = useState({})


    useEffect(() => {
        if(id && !loading && !error) {
            const currentEmployee = employees.find(item => item.id == id);
            const {name, age, position, experienceYears} = currentEmployee;
            setFormData({name, age, position, experienceYears})
            setInterests(currentEmployee.interests)
            setCompany(currentEmployee.company)
        }
    }, [loading]);


  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  }

  const handleChangeCompany = (name, value) => {
      setCompany({...company, [name]: value});
  }

  const handleSaveConfirm = () => {
    if(id) {
        handleUpdate().then(() => {
            if(!error) {
                setSaveDialogOpen(false);
            }
        })
    } else {
        handleAdd()
        setSaveDialogOpen(false);
    }
    navigate("/default")
  };

    const handleSave = () => {
        setSaveDialogOpen(true);
    }

  const handleCancel = () => {
      navigate("/default")
    }

  const handleUpdate = async() => {
    const updatedEmployee = {
        ...formData,
        interests,
        company
    };
      await dispatch(fetchUpdateEmployee(id, updatedEmployee))
  };


  const handleAdd = () => {
    const newEmployee = {
        ...formData,
        interests,
        company
    };
      dispatch(fetchAddEmployee(newEmployee))
  };


  if(loading) {
      return <div>Loading</div>
  }

    if(error) {
        return <div>{error}</div>
    }


  return (
    <>
        <form>
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item sm={4}>
                    <Typography variant="h5" gutterBottom align="center">
                        <h2>{formatMessage({ id: 'employees.pageTitle' })}</h2>
                    </Typography>
                </Grid>
                {
                    id && (
                        <Grid item sm={1}>
                            <IconButton onClick={() => setEdit(!edit)}>
                                <Pencil1Icon width={25} height={25}/>
                            </IconButton>
                        </Grid>
                    )
                }
            </Grid>

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
                            disabled={!edit}
                            required
                            fullWidth

                        />
                        <TextField
                            label="Age"
                            variant="outlined"
                            type="number"
                            value={formData.age}
                            onChange={(e) => handleChange("age", e.target.value)}
                            disabled={!edit}
                            fullWidth
                        />
                        <TextField
                            label="Position"
                            variant="outlined"
                            value={formData.position}
                            onChange={(e) => handleChange("position", e.target.value)}
                            disabled={!edit}
                            fullWidth
                        />
                        <TextField
                            label="Experience Years"
                            variant="outlined"
                            type="number"
                            value={formData.experienceYears}
                            onChange={(e) => handleChange("experienceYears", e.target.value)}
                            disabled={!edit}
                            fullWidth
                        />
                        {
                            edit && (
                                <Grid container spacing={1} columnSpacing={2}>
                                    <Grid item sm={7}></Grid>
                                    <Grid item sm={2}>
                                        <Button variant="outline" onClick={handleSave}>{!id ? "Створити" : "Зберегти"}</Button>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Button variant="outline" onClick={handleCancel}>Скасувати</Button>
                                    </Grid>
                                </Grid>
                            )
                        }
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
                            disabled={!edit}
                            fullWidth
                        />
                        <TextField
                            label="industry"
                            variant="outlined"
                            value={company.industry}
                            onChange={(e) => handleChangeCompany("industry", e.target.value)}
                            disabled={!edit}
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
                                disabled={!edit}
                                fullWidth
                            />))
                        }
                        {
                            interests.length !== 3 && edit && (
                                <Button variant="primary" onClick={() => setInterests([...interests, ""])}>Додати інтерес</Button>
                            )
                        }
                    </Stack>
                </Grid>

            </Grid>
        </form>


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
