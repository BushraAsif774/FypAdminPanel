import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./login.scss"
import axios from "axios";
import { useState } from "react";
// import Header from "../../components/Header";

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);


  // const handleFormSubmit = async (values) => {
  //   // e.preventDefault();
  //   console.log(values);
  //   axios.post("http://fyp-backend-gamma.vercel.app/v1/user/sign-in", values)
  //   .then((res) => {
  //     console.log(res.data);
      
  //   })
  //   .catch((err) => console.log(err.data));

  // console.log("data: ",values);
  // };
  const handleFormSubmit= (values)=>{
    var data = JSON.stringify(values);
    
    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'https://fyp-backend-gamma.vercel.app/v1/user/sign-in',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setSuccess("SIGNED IN SUCCESULL")
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
          <h1>LOGIN HERE</h1>
      </div>
      <div style={{color:"red", textAlign:"center", marginRight:"auto", marginLeft:"auto" }}>
        {error}
      </div>
      <div style={{color:"green", textAlign:"center", marginRight:"auto", marginLeft:"auto" }}>
        {success}
      </div>
      <Box m="20px" width="50%" mx="auto" border="1px solid purple" padding="2rem"  boxShadow="2px 4px 10px 1px rgba(201, 201, 201, 0.47)"  >
        

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
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                }}
              >
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
              
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Login
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

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const cnicRegExp= /^[0-9]{5}[0-9]{7}[0-9]{1}$/

const checkoutSchema = yup.object().shape({
 
  // firstName: yup.string().required("required"),
  password: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  cnic: yup
    .string()
    .matches(cnicRegExp, "CNIC is not valid, use without hyphens")
    .required("required"),

});
const initialValues = {
  cnic:"",
  password:"",
};

export default Login;
