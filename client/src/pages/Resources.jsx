import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ResourceCard from "../components/Resource/ResourceCard";
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import { List, Select } from "antd";
import { UNCADepartmentsArray } from "../data/UNCADepartmentsArray";
import { Box } from "@mui/system";



const Resources = () => {
  const [resources, setResources] = useState([]);
  const [resourcesChanged, setResourcesChanged] = useState(false)
  const [selection, setSelection] = useState("All Departments");
  const [err, setErr] = useState(null);
  const [isSearchable, setIsSearchable] = useState(true);
  
  const handleDepartmentChange = (option) => {
    setSelection(option);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/resources/professor/department/" +
            selection
        );
        setResources(res.data);
      } catch (err) {
        setErr(err.response.data);
        console.log(err);
      }
    };
    fetchData();
  }, [selection]);

  return (
    <Box sx={{ flexDirection: "column", justifyContent: "center" }}>
      <FormControl
        sx={{ maxWidth: 500, textAlign: "center", justifyContent: "center" }}
      >
        <FormLabel sx={{ color: "white" }}>
          {" "}
          Filter Country Connections By Department{" "}
        </FormLabel>
        <Select
          className="basic-single"
          defaultValue="All Departments"
          placeholder={selection ? selection : "All Departments"}
          label="department-select"
          options={UNCADepartmentsArray}
          onChange={handleDepartmentChange}
          value={selection}
          autoFocus={true}
        />
      </FormControl>
{/*       <Grid
        container

        sx={{
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 5,
          width: "auto",
        }}
      > */}
        {resources.length >= 1 && (
          <List>
            {resources.map((resource) => (
              <ResourceCard data={resource} key={resource.professor_id} />
            ))}
          </List>
        )}
  {/*     </Grid> */}
    </Box>
  );
};

export default Resources;
