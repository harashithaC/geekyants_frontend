
import { Box, Button, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextFieldComponent from '../utils/TextFieldComponent';
import { loginAPI } from '../../reducer/loginSlice';
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const passwordHideShow = () => {
        setShow(!show);
    };
    const initialValues = {
        email: "",
        password: "",
    }
    const CheckOutSchema = yup.object().shape({
        email: yup.string().email("enter proper email id"),
        password: yup.string().required("Required*"),
    })
    const handleFormSubmit = async (values, { resetForm }) => {
        const data = {
            email: values.email,
            password: values.password,
        };
        console.log("data==>", data)
        // navigate("/shareTrip")
        const response = await dispatch(loginAPI(data))
        if (response.payload) {
            if (response.payload.success === "false") {
                Swal.fire({
                    title: "Login failed!",
                    text: `${response.payload.message}`,
                    icon: "error",
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });
            } else
                await localStorage.setItem("shareTrip", response.payload.token);
            Swal.fire({
                title: "Login Successfully!",
                text: "Welcome to Management System!",
                icon: "success",
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/shareTrip");
                }
            });
        }
    }
    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={CheckOutSchema}
                    enableReinitialize
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // gap: "1em",
                                    // p: 1,
                                    position: "sticky",
                                    // top: "0.2m",
                                    bottom: "1em",
                                    zIndex: 99,
                                    bgcolor: "white",
                                    // marginBottom: "1.5em",
                                }}
                            >
                                <img
                                    src={'/SKB_Logo[1].3-03.png'} alt="L"
                                    style={{ width: "auto", height: 100, mt: "-2em" }}
                                />
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "2em",
                                p: 1,
                                position: "sticky",
                                top: "2.7em",
                                bottom: "2.5em",
                                // zIndex: 99,
                                bgcolor: "white",
                                marginBottom: "2em",
                            }}>
                                <Typography sx={{ color: "#0B63F8", fontFamily: "serif", fontSize: "1.8em" }}>Welcome to Share-Trip</Typography>
                            </Box>
                            <Box
                                sx={{
                                    boxShadow: "0px 0px 16px 11px rgba(169, 169, 169, 0.27)",
                                    border: '1px solid #ddd',
                                    borderRadius: "3%",
                                    width: "450px",
                                    height: "330px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // backgroundColor: "#e8e7e7"
                                }}
                            >
                                <div
                                    style={{
                                        marginTop: "22px",
                                        width: "380px",
                                        height: "35px",
                                    }}
                                >
                                    <InputLabel style={{ marginBottom: "0.5em" }}  >Phone Number*</InputLabel>
                                    <TextFieldComponent
                                        placeholder={"Enter your phone number"}
                                        name="email"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values.email}
                                        errors={errors.email}
                                        touched={touched.email}
                                        style={{ borderColor: "blue" }}
                                    />
                                </div>
                                <div
                                    style={{
                                        width: "380px",
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        marginTop: "3em",
                                    }}
                                >
                                    <InputLabel
                                        style={{ marginRight: "19em", marginTop: "1.2em" }}
                                    >
                                        Password*
                                    </InputLabel>
                                    <TextField
                                        // margin="normal"
                                        margin="dense"
                                        fullWidth
                                        name="password"
                                        autoComplete="on"
                                        type={show ? "text" : "password"}
                                        id="password"
                                        placeholder="your password"
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={passwordHideShow} edge="end">
                                                        {show ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3 }}
                                        style={{
                                            background: "#0B63F8",
                                            width: "150px",
                                            marginLeft: "22px",
                                        }}
                                    >
                                        Log in
                                    </Button>
                                </Box>
                            </Box>

                        </form>
                    )}
                </Formik>
            </Box >
        </>
    )
}

export default Login
