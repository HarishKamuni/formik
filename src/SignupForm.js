import React from "react";
import "./signupform.css";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

const hobbies = ["Cricket", "Hollyball", "Football", "Hokki"];
const validationSchema = yup.object({
  Name: yup.string().min(2,"name must be at least 2 characters").required("Name is required"),
  Address: yup
    .string()
    .min(30, "address should minimum 15 characters")
    .max(50,"address should less than 30 characters")
    .required("address is required"),
  Country: yup.string().required("Country is required"),
  Gender: yup.string().min(1).required("Gender is required"),
  Hobbies: yup
    .array()
    .min(1, "minimum one hobby select")
    .required("Hobbies are required"),
});

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      Name: "",
      Address: "",
      Country: "",
      Gender: "",
      Hobbies: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values,null,2));
    },
    validationSchema: validationSchema,
  });
  return (
    <div className="signupform">
      <form className="form" onSubmit={formik.handleSubmit}>
        <TextField
          id="Name"
          name="Name"
          label="Name"
          variant="standard"
          margin="normal"
          value={formik.values.Name}
          onChange={formik.handleChange}
          error={formik.touched.Name && Boolean(formik.errors.Name)}
          helperText={formik.touched.Name && formik.errors.Name}
        />
        <TextField
          id="Address"
          name="Address"
          label="Address"
          multiline
          rows={2}
          maxRows={5}
          variant="standard"
          margin="normal"
          value={formik.values.Address}
          onChange={formik.handleChange}
          error={formik.touched.Address && Boolean(formik.errors.Address)}
          helperText={formik.touched.Address && formik.errors.Address}
        />
        <FormControl error={formik.touched.Country && Boolean(formik.errors.Country)}
            helperText={formik.touched.Country && formik.errors.Country} variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Country</InputLabel>
          <Select
            id="Country"
            name="Country"
            value={formik.values.Country}
            onChange={formik.handleChange}
            label="Country"
            
          >
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="America">America</MenuItem>
            <MenuItem value="Chaina">Chaina</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl margin="normal" error={formik.touched.Gender && Boolean(formik.errors.Gender)}
            helperText={formik.touched.Gender && formik.errors.Gender}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            id="Gender"
            name="Gender"
            value={formik.values.Gender}
            control={<Radio />}
            onChange={formik.handleChange}
            
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="female"
            />
          </RadioGroup>
        </FormControl>

        {/* Multi select */}
        <FormControl error={formik.touched.Hobbies && Boolean(formik.errors.Hobbies)}
            helperText={formik.touched.Hobbies && formik.errors.Hobbies} variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-multiple-name-label">
            Hobbies/Interest
          </InputLabel>
          <Select
            id="Hobbies"
            name="Hobbies"
            multiple
            value={formik.values.Hobbies}
            onChange={formik.handleChange}
            
          >
            {hobbies.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ m: 1, minWidth: 120 }} type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
