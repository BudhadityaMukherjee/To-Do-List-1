import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import "./TodoList.css";

export default function Listing(props) {
  const [line, setLine] = useState(false);

  return (
    <>
      <div>
        <Button
          className="d-inline myBtn2"
          onClick={() => {
            document.getElementById('list').style ={textDecoration:"line-through"}
          }}
        >
          <DeleteIcon />
        </Button>

        <Button onClick={() => {
            return props.update(props.id);
        }} className="myBtn3">
          <EditIcon/>
        </Button>

        <li
          className="d-inline"
          id="list"
          style={{ textDecoration:"none" }}
        >
          {props.text}
        </li>
      </div>
    </>
  );
}
