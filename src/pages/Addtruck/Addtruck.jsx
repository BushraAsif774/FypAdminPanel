import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../new/new.scss"
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
    
    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'https://fyp-backend-gamma.vercel.app/v1/truck/new-truck',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setSuccess("Your Data Added Successfully");
      values={
        make: "",
        model: "",
        waterInGallons: "",
        
      };
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
  }

  return (
    <div className="new" >
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
          <h1>ADD TRUCK HERE</h1>
        </div>
      <div style={{color:"red", textAlign:"center", marginRight:"auto", marginLeft:"auto" }}>
        {error}
      </div>
      <div style={{color:"green", textAlign:"center", marginRight:"auto", marginLeft:"auto" }}>
        {success}
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
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                }}
              >
                <TextField
                  fullWidth
                  className="inputstyle"
                  variant="filled"
                  type="text"
                  label="Make"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.make}
                  name="make"
                  error={!!touched.make && !!errors.make}
                  helperText={touched.make && errors.make}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="inputstyle"
                  variant="filled"
                  type="number"
                  label="model"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.model}
                  name="model"
                  error={!!touched.model && !!errors.model}
                  helperText={touched.model && errors.model}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="inputstyle"
                  variant="filled"
                  type="number"
                  label="waterInGallons"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.waterInGallons}
                  name="waterInGallons"
                  error={!!touched.waterInGallons && !!errors.waterInGallons}
                  helperText={touched.waterInGallons && errors.waterInGallons}
                  sx={{ gridColumn: "span 2" }}
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

// const phoneRegExp =
//   /^((\[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const cnicRegExp= /^[0-9]{5}[0-9]{7}[0-9]{1}$/;

const checkoutSchema = yup.object().shape({
  make: yup.string().required("required"),
  model: yup.string().required("required"),
  waterInGallons: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  // phone: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  // password: yup.string().required("required"),
  // cnic: yup
  //     .string()
  //     .matches(cnicRegExp, "CNIC is not valid, use without hyphens")
  //     .required("required"),
 
});
const initialValues = {
  make: "",
  model: "",
  waterInGallons: "",
  
};

export default New;
