import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UNCADepartmentsArray } from "../data/UNCADepartmentsArray.js";
import CountryMultiSelect from "../components/UI/CountryMultiSelect";
import Select from "react-select";
import AddResourceStyle from "./AddResourceStyle.module.css";
import { Button, Card, InputLabel, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextArea from "antd/es/input/TextArea.js";
import Alert from "@mui/material/Alert";
import { red } from "@mui/material/colors";

/* In order to populate both the resource and professor tables, the professor is created so that the 
professor_id PK may then be used as the FK in the resource table - 
TODO: Implement duplicate checks on the backend for professors 
 */

// Initial form adds professor, resource entry requires prof id (FK )
const EditResource = (props) => {
  const location = useLocation();
  const propsData = location.state;
  const professor_id = propsData.professor_id;

  // for professor add
  const [inputs, setInputs] = useState({ ...propsData });
  const [countries, setCountries] = useState([]);
  const [err, setErr] = useState(null);
  const [file, setFile] = useState(null)
  const [success, setSuccess] = useState(false);
  /*   const [file, setFile] = useState(null); */

  // For React-select for departments
  const [isSearchable, setIsSearchable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/resources/professor/" + professor_id
        );
        // ^ Gets Professor / country connections by professor_id //
        setCountries(
          res.data.map((country) => ({
            value: country.country_id,
            label: country.name,
          }))
        );
        console.log("Current state of card:",inputs)
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchData();
  }, []);

  /* 
  TO DO - ADD IMAGE UPLOADING FOR HEADSHOTS 
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }; */
  //for photo upload using Multer 
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
  };

  const handleFileChange = (e) => {
    console.log("file change function, setFile():",e.target.files[0]);
    setFile(e.target.files[0])
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErr(null)
    const imgUrl = await upload();
    console.log("imgurl:",imgUrl)
    console.log(inputs);
    console.log(countries);

    try {
      const res = await axios.put(
        "http://localhost:8800/api/resources/professor/" + professor_id,
        {inputs:inputs, img: file ? imgUrl : "placeholder.jpg"}
      );
     
        const countryUpdate = await axios.put(
          "http://localhost:8800/api/resources/" + professor_id,
          {
            countries,
            professor_id,
          }
        );
        console.log("countryUpdate:", countryUpdate);
      
    } catch (err) {
      console.log("error: ", err.response.data.message);
      setErr(err.response.data)
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
        setSuccess(false);
      }, 4000);
    }
    return;
  };
  
  return (
    <>
      <div className={AddResourceStyle.add}>
        <Card
          sx={{
            justifyContent: "center",
            textAlign: "center",
            m: 10,
            padding: 10,
          }}
        >
          <Link to="/resources">
            <ArrowBackIcon sx={{ fontSize: "40px" }} />
          </Link>
          <Typography variant="h6" color="text.primary">
            Edit Professor Details / Connections
            {success && (
              <Alert severity="success">
                Successfull Added Professor and Connections!{" "}
              </Alert>
            )}
            {err && (
              <Alert severity="error">
                Error: {err.message}!{" "}
              </Alert>
            )}
          </Typography>
        </Card>

        <form onSubmit={handleFormSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="fname"
            placeholder="first name"
            required
            onChange={handleChange}
            value={inputs.fname}
          />
          <label>Last Name</label>
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
            placeholder={inputs.department}
            label="test"
            isSearchable={isSearchable}
            options={UNCADepartmentsArray}
            onChange={handleDepartmentChange}
            value={inputs.department}
            autoFocus={true}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 401, minWidth: 400 }),
            }}
          />
          <InputLabel>Description</InputLabel>
          <TextArea
            name="description"
            placeholder="Professor Summary / Description"
            required
            onChange={handleChange}
            value={inputs.description}
            default=""
            styles={{
              maxWidth: 400,
              padding: 5,
              margin: 10,
            }}
          />
          <label>Country Connections</label>
          <CountryMultiSelect
            onChange={handleCountryChange}
            value={countries}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            required
            onChange={handleChange}
            value={inputs.email}
          />
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
            value=""
            default={inputs.image}
          />
          <label className="file" htmlFor="file">
            Upload Image - current file is: {inputs.image}
          </label>
          <button onClick={handleFormSubmit}>Submit </button>
      
        </form>
      
      </div>
    </>
  );
};

export default EditResource;
