import React, { useState } from "react";
import axios from "axios";
import { UNCADepartmentsArray } from "../data/UNCADepartmentsArray.js";
import Select from "react-select";
import AddResourceStyle from "./AddResourceStyle.module.css";
import TextArea from "antd/es/input/TextArea.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import CountryMultiSelect from "../components/UI/CountryMultiSelect";

/* In order to populate both the resource and professor tables, the professor is created so that the 
professor_id PK may then be used as the FK in the resource table - 
TODO: Implement duplicate checks on the backend for professors 
 */

// Initial form adds professor, resource entry requires prof id (FK )
const AddResource = () => {
  // for professor add
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    department: "",
    description: "",
    email: "",
  });

  const [countries, setCountries] = useState([]);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [file, setFile] = useState(null);
  const options = UNCADepartmentsArray.slice(1);
  // For React-select for departments
  const [isSearchable, setIsSearchable] = useState(true);
  const navigate = useNavigate();

  const upload = async () => {
    try {
      console.log("upload triggered")
      const formData = new FormData();
      formData.append("file", file);
      console.log("formdata:",formData)
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      console.log("res of upload:",res.data)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCountryChange = (e) => {
    setCountries(e);
  };

  const handleDepartmentChange = (option) => {
    setInputs((prev) => ({ ...prev, department: option.value }));
    console.log("updated department: ", inputs);
  };

  const handleFileChange = (e) => {
    console.log("file change function, setFile():",e.target.files[0]);
    setFile(e.target.files[0])
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleEmailChange = (e) => {
    if (!isValidEmail(e.target.value)) {
      setEmailErr(true);
    } else {
      setEmailErr(null);
    }

    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErr(null)
    const imgUrl = await upload();
    console.log("imgurl:",imgUrl)
    console.log(inputs);
    console.log(countries);
    if (!isValidEmail(inputs.email)) {
      setEmailErr(false);
      return;
    }

    try {
      console.log("in first try block");
      const res = await axios.post(
        "http://localhost:8800/api/resources/professor",
       { inputs: inputs, img: file ? imgUrl : "placeholder.jpg"},
      
    
      );
      console.log("res:", res.data.insertId);
      const id = res.data.insertId;
      try {
        console.log("in try statement for add countries ");

        console.log("current countries: ", countries);
        const connectionsRes = await axios.post(
          "http://localhost:8800/api/resources/",
          { countries, professor_id: id }
        );
        console.log("second try data:", connectionsRes.data);
      } catch {
        console.log("err2: ", err.response);
        setErr(err.data);
        return;
      }
    } catch (err) {
      console.log("err1: ", err.response.data.message);
      setErr(err.response.data);
      return;
    }

    console.log(err);
    setSuccess(true);

    if (!err) {
      setSuccess(true);
      setTimeout(() => {
        console.log("Delayed for 4 second.");

        setInputs({
          fname: "",
          lname: "",
          department: "",
          description: "",
          email: "",
        });
        setCountries([]);
        setFile(null);
        setErr(null);
        setEmailErr(false);
        setSuccess(false);
      }, 4000);
    }
    return;
  };

  return (
    <div className={AddResourceStyle.add}>
      {success && 
        <Alert severity="success">
          Successfull Added Professor and Connections!{" "}
        </Alert> } 
        {err && 
          (
        <Alert severity="error">
          Problem Adding Professor/Connections: {err.message}
        </Alert>
      )}
      
      <div className={AddResourceStyle.message}>
        <h1>Add New Professor and Connections</h1>
        <form
          onSubmit={handleFormSubmit}
          sx={{
            padding: 20,
          }}
        >
          <input
            type="text"
            name="fname"
            placeholder="first name"
            required
            onChange={handleChange}
            value={inputs.fname}
          />
          <input
            type="text"
            name="lname"
            placeholder="last name"
            required
            onChange={handleChange}
            value={inputs.lname}
          />
          <label>Department</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue=""
            isSearchable={isSearchable}
            options={options}
            onChange={handleDepartmentChange}
            value={inputs.department}
            placeholder={inputs.department}
            autoFocus={true}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 401, minWidth: 200 }),
            }}
          />
          <TextArea
            type="text"
            name="description"
            placeholder="Description"
            required
            onChange={handleChange}
            value={inputs.description}
            maxLength="3000"
          />
          <CountryMultiSelect
            onChange={handleCountryChange}
            value={countries}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            required
            onChange={handleEmailChange}
            value={inputs.email}
          />
          {emailErr && <p> Error: Invalid Email Formatting </p>}
          <button onClick={handleFormSubmit}>Submit </button>
          {err && (
            <Button variant="outlined">
              <Link
                to={"/resources/edit"}
                state={err.professor}
                sx={{ color: red[800] }}
              >
                <p> Error: {err.message}</p>
              </Link>
            </Button>
          )}
          <input
            type="file"
            id="file"
            name=""
            onChange={handleFileChange}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
        </form>
      </div>
    </div>
  );
};

export default AddResource;
