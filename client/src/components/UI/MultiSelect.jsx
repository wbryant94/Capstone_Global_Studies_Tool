import React, { useState } from "react";
import { Select, Space } from "antd";
import axios from "axios";
import { purple } from "@mui/material/colors";
import { MenuItem } from "@mui/material";
import { Option } from "antd/es/mentions";


const MultiSelect = (props) => {
const [countryOptions, setCountryOptions] = React.useState([]);
  
//get countries to select from from DB //
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/resources/countries"
        );
        setCountryOptions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log("countries in multiselect: ",props.value)

  return (
    <Space
      style={{
        width: "100%",
      }}
      direction="vertical"
    >
      <Select
        mode="multiple"
        allowClear
        style={{
          width: "100%",
          color: "green",
          backgroundColor: "black",
        }}

        placeholder="Please select Countries"
        onChange={props.onChange}
        options={countryOptions}
        value={props.value}
      />

  
    {props.value.map(option=> (
    <Option 
    key={option.country_id}>{'test'}
    </Option>
  ))}  
    </Space>
  );
};

export default MultiSelect;
