import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { countryArray } from "../../data/countryArray.js";
import { UNCADepartmentsArray } from "../../data/UNCADepartmentsArray.js";
import MultiSelect from "./CountryMultiSelect";
import EditIcon from "@mui/icons-material/Edit";
import Edit from '@mui/icons-material/Edit';
import { textAlign } from '@mui/system';


export default function EditResourceModal(resource) {
 
    const [inputs, setInputs] = React.useState(resource);
    console.log("current state: ",inputs)


    React.useEffect(() => {
        setInputs(resource);
    }, [resource])

      const [country, setCountry] = React.useState([]);
      
      
    
      const handleChange = (e) => {
        /* setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })); */
      };
    
      const handleCountryChange = (e) => {
        setCountry(e.target.value);
      };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit <Edit />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{textAlign: 'center'}}>Alter Professor/Connections</DialogTitle>
        <DialogContent sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <DialogContentText>
            Make adjustments to Professor and Assosciated countries - changes will be reflected on the Resources page and Map visualizer. 
          </DialogContentText>
          <form >
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
        <input
          type="text"
          name="department"
          placeholder="Department"
          required
          onChange={handleChange}
          value={inputs.department}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          required
          onChange={handleChange}
          value={inputs.description}
        />
        <MultiSelect
          countries={countryArray}
          onChange={handleCountryChange}
          countryName={country}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          required
          onChange={handleChange}
          value={inputs.email}
        />
        <input
          type="text"
          name="image"
          placeholder="photo"
          required
          onChange={handleChange}
          value={inputs.image}
        />
        <button type="submit">Submit </button>
      </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}