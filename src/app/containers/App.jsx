import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAxiosInterceptors } from "misc/requests";
import * as pages from "constants/pages";
import AuthoritiesProvider from "misc/providers/AuthoritiesProvider";
import DefaultPage from "pageProviders/Default";
import EmployeeDetailsPage from "pageProviders/EmployeeDetails";
import Loading from "components/Loading";
import LoginPage from "pageProviders/Login";
import PageContainer from "pageProviders/components/PageContainer";
import pageURLs from "constants/pagesURLs";
import SecretPage from "pageProviders/Secret";
import ThemeProvider from "misc/providers/ThemeProvider";
import UserProvider from "misc/providers/UserProvider";
import actionsUser from "../actions/user";
import Header from "../components/Header";
import IntlProvider from "../components/IntlProvider";
import MissedPage from "../components/MissedPage";
import SearchParamsConfigurator from "../components/SearchParamsConfigurator";
import {fetchEmployees} from "../reducers/emloyee";
import {Box, Button, Modal, Typography} from "@mui/material";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function App() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    componentDidMount: false,
  });

  const {
    isAuth,
    errors,
    isFailedSignIn,
    isFailedSignUp,
    isFetchingSignIn,
    isFetchingSignUp,
    isFetchingUser,
  } = useSelector(({ user }) => user);
  console.log("isFetchingSignIn " + isFetchingSignIn)
  console.log("isFetchingSignUp " + isFetchingSignUp)
  console.log("isFetchingUser " + isFetchingUser)
  console.log("isAuth: " + isAuth);
  const [fetchedPages, setFetchedPages] = useState([0]);

  const [modalOpen, setModalOpen] = useState(false);

  const handleFetchedPage = (page) => {
    setFetchedPages([...fetchedPages, page]);
  }

  useEffect(() => {
    addAxiosInterceptors({
      onSignOut: () => dispatch(actionsUser.fetchSignOut()),
    });
    dispatch(actionsUser.fetchUser());
    setState({
      ...state,
      componentDidMount: true,
    });
  }, []);

  useEffect(() => {
    // Your logic for fetching initial data
    dispatch(actionsUser.fetchUser())
  }, []);

  useEffect(() => {
    if(!isAuth) {
      setModalOpen(true);
      return;
    }
    setModalOpen(false)
    dispatch(fetchEmployees());
  }, [isAuth]);

  return (
    <UserProvider>
      <AuthoritiesProvider>
        <ThemeProvider>
          <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Login
              </Typography>
              <Button onClick={() => actionsUser.signIn()}>Login</Button>
            </Box>
          </Modal>
          <BrowserRouter>
            <SearchParamsConfigurator />
            {/* This is needed to let first render passed for App's
             * configuration process will be finished (e.g. locationQuery
             * initializing) */}
            {state.componentDidMount && (
              <IntlProvider>
                <Header onLogout={() => dispatch(actionsUser.fetchSignOut())} />
                {isFetchingUser && (
                  <PageContainer>
                    <Loading />
                  </PageContainer>
                )}
                {!isFetchingUser && (
                  <Routes>
                    <Route
                      element={<DefaultPage fetchedPages={fetchedPages} handleFetchedPage={handleFetchedPage}/>}
                      path={`${pageURLs[pages.defaultPage]}`}
                    />
                    <Route
                        element={<EmployeeDetailsPage />}
                        path={`${pageURLs[pages.employeeDetails]}`}
                    />
                    <Route
                      element={<EmployeeDetailsPage />}
                      path={`${pageURLs[pages.employeeDetails]}/:id`}
                    />
                    <Route
                      element={<SecretPage />}
                      path={`${pageURLs[pages.secretPage]}`}
                    />
                    <Route
                      element={
                        <LoginPage
                          errors={errors}
                          isFailedSignIn={isFailedSignIn}
                          isFailedSignUp={isFailedSignUp}
                          isFetchingSignIn={isFetchingSignIn}
                          isFetchingSignUp={isFetchingSignUp}
                          onSignIn={({ email, login, password }) =>
                            dispatch(
                              actionsUser.fetchSignIn({
                                email,
                                login,
                                password,
                              })
                            )
                          }
                          onSignUp={({
                            email,
                            firstName,
                            lastName,
                            login,
                            password,
                          }) =>
                            dispatch(
                              actionsUser.fetchSignUp({
                                email,
                                firstName,
                                lastName,
                                login,
                                password,
                              })
                            )
                          }
                        />
                      }
                      path={`${pageURLs[pages.login]}`}
                    />
                    <Route
                      element={
                        <MissedPage
                          redirectPage={`${pageURLs[pages.defaultPage]}`}
                        />
                      }
                      path="*"
                    />
                  </Routes>
                )}
              </IntlProvider>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </AuthoritiesProvider>
    </UserProvider>
  );
}

export default App;
