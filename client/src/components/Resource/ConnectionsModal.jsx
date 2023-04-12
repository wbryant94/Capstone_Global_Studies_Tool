import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Grid } from "@mui/material";
import ResourceCard from "../Resource/ResourceCard";
import styled from "@emotion/styled";
import Slide from '@mui/material/Slide';
import { Card } from "antd";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); 


export default function ConnectionsModal(props) {
  const { onClose, selectedValue, open, title } = props;
 
  const handleClose = () => {
    onClose(selectedValue);
  };

 

  return (

    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}
    sx={{
      minWidth: 500,
      border: "2px solid black"
    }}>
      <DialogTitle sx={{fontSize: 24, textAlign: "center"}}>{props.title}</DialogTitle>
      {props.selectedValue.length ? ( 
      <Card>
       {props.selectedValue.map((resource) => (
       
            <ResourceCard elevation={3} data={resource}/>
          ))}  
     
      </Card>
      ) : (<Card>
        No Connections To Display
      </Card>)}
    </Dialog>
  );
}




