import axios from "axios";
import React from "react";
import { useState } from "react";
import Select from "react-select";


export default function MultiSelect(props) {
  const [countries, setCountries] = useState(null);
  const [selected, setSelected] = useState(props.value)



  const handleChange = (e) => {
    console.log("e",e)
    setSelected(e)
  }
  //get countries to select from //
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/resources/countries"
        );
        const countryVals = res.data
        setCountries(res.data.map((country) => (
            {
            value: country.country_id,
            label: country.name,
            }
        )));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Select
      isMulti = {true}
      name="countries"
      options={countries}
      onChange={props.onChange}
      value={props.value}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
