import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./new.scss"
import axios from "axios";
import { useState } from "react";
import { textAlign } from "@mui/system";
// import Header from "../../components/Header";

const New = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [error, setError]=useState("");
  const [success,setSuccess]=useState("");

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  //    // e.preventDefault();
  //    axios.post("https://fyp-backend-gamma.vercel.app/driver/new-driver", values)
  //    .then((res) => {
  //      console.log(res.data);
       
  //    })
  //    .catch((err) => console.log(err.data));
  // };

  const handleFormSubmit=(values)=>{
    var data = JSON.stringify(values);
    console.log(data);
    
    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'https://fyp-backend-gamma.vercel.app/v1/driver/new-driver',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error.response.data);
      setError(error.response.data)
    });
    
  }

  return (
    <div className="new" >
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
          <h1>ADD DRIVER HERE</h1>
        </div>
      <div style={{color:"red", textAlign:"center", marginRight:"auto", marginLeft:"auto" }}>
        {error}
      </div>
      <Box m="20px" width="50%" mx="auto" border="1px solid purple" padding="2rem">
        {/* <Header title="CREATE USER" subtitle="Create a New User Profile" /> */}

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  className="inputstyle"
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="inputstyle"
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="inputstyle"
                  variant="filled"
                  type="number"
                  label="CNIC"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cnic}
                  name="cnic"
                  error={!!touched.cnic && !!errors.cnic}
                  helperText={touched.cnic && errors.cnic}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="inputstyle"
                  variant="filled"
                  type="text"
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 4" }}
                />
                 <TextField
                  fullWidth
                  className="inputstyle"
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="inputstyle"
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                
            
                
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  ADD
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
  </div>
  </div>
  );
};

const phoneRegExp =
  /^((\[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const cnicRegExp= /^[0-9]{5}[0-9]{7}[0-9]{1}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  cnic: yup
      .string()
      .matches(cnicRegExp, "CNIC is not valid, use without hyphens")
      .required("required"),
 
});
const initialValues = {
  firstName: "",
  lastName: "",
  cnic: "",
  phone: "", 
  password: "",
  email: "",
};

export default New;
