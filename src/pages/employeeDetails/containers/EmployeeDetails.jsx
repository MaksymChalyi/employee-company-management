import React, {useEffect, useRef, useState} from "react";
import {
    Alert, AlertTitle,
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
import {clearLastCreated, fetchAddEmployee, fetchUpdateEmployee} from "app/reducers/emloyee";
import {useNavigate, useParams} from "react-router-dom";
import {useIntl} from "react-intl";
import {ArrowLeftIcon, Pencil1Icon} from "@radix-ui/react-icons";
import IconButton from "../../../components/IconButton";


function EmployeeDetails() {
  const {employees, loading, error, lastCreated} = useSelector(state => state.employee);
  const {id} = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {formatMessage} = useIntl();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [edit, setEdit] = useState(!id);
  const [alertSuccess, setAlertSuccess] = useState(false)
  const [formData, setFormData] = useState({});
  const [interests, setInterests] = useState([""])
  const [company, setCompany] = useState({})


    useEffect(() => {
        if(id && !loading && !error) {
            const currentEmployee = employees.find(item => item.id == id);
            if(currentEmployee) {
                const {name, age, position, experienceYears} = currentEmployee;
                setFormData({name, age, position, experienceYears})
                setInterests(currentEmployee.interests)
                setCompany(currentEmployee.company)
            }
        }
    }, [loading, edit]);

  useEffect(() => {
      if(lastCreated && lastCreated.id && !loading && !error) {
          console.log("lastCreated", lastCreated);
          navigate("/employeeDetails/" + lastCreated.id)
          dispatch(clearLastCreated());
      }
  }, [lastCreated])




  const handleChange = (name, value) => {
      if(name === "age" || name === "experienceYears"){
          if(parseInt(value) < 0) {
              return
          }
      }
    setFormData({...formData, [name]: value});
  }

  const handleChangeCompany = (name, value) => {
      setCompany({...company, [name]: value});
  }

  const handleSaveConfirm = () => {
    if(id) {
        handleUpdate()
        setAlertSuccess(true)
        setTimeout(() => setAlertSuccess(false), 3000)
    } else {
        handleAdd()
    }
      setEdit(false)
      setSaveDialogOpen(false);
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaveDialogOpen(true);
    }

  const handleBack = () => {
      navigate("/default")
    }

    const handleCancel = () => {
        if(id) {
            setEdit(false);
        }else{
            handleBack();
        }
    }

  const handleUpdate = () => {
    const updatedEmployee = {
        ...formData,
        interests,
        company
    };
      dispatch(fetchUpdateEmployee(id, updatedEmployee))
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


  return (
    <>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={8} justifyContent="center" alignItems="center">
                <Grid item sm={4}>
                    <IconButton onClick={handleBack}>
                        <ArrowLeftIcon width={25} height={25}/>
                    </IconButton>
                </Grid>
                <Grid item sm={8}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <Typography variant="h5" gutterBottom align="center">
                                <h2>{formatMessage({ id: 'employees.pageTitle' })}</h2>
                            </Typography>
                        </Grid>
                        <Grid item>
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
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {
                    !error && alertSuccess && (
                        <Grid item sm={12}>
                            <Alert severity="success">
                                Employee was successfully updated.
                            </Alert>
                        </Grid>
                    )
                }
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
                <Grid item xs={6} sm={6}>
                    <Stack spacing={2}>
                        <Typography variant="h3">
                            {formatMessage({ id: 'employees.pageTitle' })}
                        </Typography>
                        <TextField
                            label={formatMessage({ id: 'employee.name' })}
                            variant="outlined"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            disabled={!edit}
                            required
                            fullWidth

                        />
                        <TextField
                            label={formatMessage({ id: 'employee.age' })}
                            variant="outlined"
                            type="number"
                            min={0}
                            value={formData.age}
                            onInput={(e) => handleChange("age", e.target.value)}
                            disabled={!edit}
                            required
                            fullWidth
                        />
                        <TextField
                            label={formatMessage({ id: 'employee.position' })}
                            variant="outlined"
                            value={formData.position}
                            inputProps={{min: 0}}
                            onInput={(e) => handleChange("position", e.target.value)}
                            disabled={!edit}
                            required
                            fullWidth
                        />
                        <TextField
                            label={formatMessage({ id: 'employee.experienceYear' })}
                            variant="outlined"
                            type="number"
                            inputProps={{min: 0}}
                            value={formData.experienceYears}
                            onChange={(e) => handleChange("experienceYears", e.target.value)}
                            disabled={!edit}
                            required
                            fullWidth
                        />
                        {
                            edit && (
                                <Grid container spacing={1} columnSpacing={2}>
                                    <Grid item sm={7}></Grid>
                                    <Grid item sm={2}>
                                        <Button variant="outline" type="submit">{!id ? formatMessage({ id: 'btn.add' }) : formatMessage({ id: 'btn.update' })}</Button>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <Button variant="outline" onClick={handleCancel}>{formatMessage({ id: 'btn.cancel' })}</Button>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Stack>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Stack spacing={2}>
                        <Typography variant="h3">
                            {formatMessage({ id: 'employee.company' })}
                        </Typography>
                        <TextField
                            label={formatMessage({ id: 'company.name' })}
                            variant="outlined"
                            value={company.name}
                            onChange={(e) => handleChangeCompany("name", e.target.value)}
                            disabled={!edit}
                            required
                            fullWidth
                        />
                        <TextField
                            label={formatMessage({ id: 'company.industry' })}
                            variant="outlined"
                            value={company.industry}
                            onChange={(e) => handleChangeCompany("industry", e.target.value)}
                            disabled={!edit}
                            required
                            fullWidth
                        />
                        <Typography variant="h3">
                            {formatMessage({ id: 'employee.interests' })}
                        </Typography>
                        {
                            interests.map((item, index) => (<TextField
                                label={formatMessage({ id: 'employee.interests' })}
                                variant="outlined"
                                value={item}
                                onChange={(e) => setInterests(interests.map((_, i) => i === index ? e.target.value : _ ))}
                                disabled={!edit}
                                required
                                fullWidth
                            />))
                        }
                        {
                            interests.length !== 3 && edit && (
                                <Button variant="primary" onClick={() => setInterests([...interests, ""])}>{formatMessage({ id: 'btn.interestAdd' })}</Button>
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
