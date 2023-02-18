import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import "./TodoList.css";

export default function Listing(props) {
  const [line, setLine] = useState(false);

  const updateItems = (event, index) => {
    console.log(index);
    console.log(event.target.value);
    let newArr = [];
  };

  return (
    <>
      <div>
        <Button
          className="d-inline myBtn2"
          onClick={() => {
            setLine(true);
          }}
        >
          <DeleteIcon />
        </Button>

        <Button onClick={updateItems} className="myBtn3">
          <EditIcon/>
        </Button>

        <li
          className="d-inline"
          style={{ textDecoration: line ? "line-through" : "none" }}
        >
          {props.text}
        </li>
      </div>
    </>
  );
}
