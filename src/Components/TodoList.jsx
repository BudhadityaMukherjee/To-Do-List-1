import React, { useState } from "react";
import "./TodoList.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Listing from "./Listing";

export default function TodoList() {
  const [item, setItem] = useState("");
  const [newItem, setNewItem] = useState([]);

  const addItem = () => {
    //To save the previous inputs and also add new inputs to the array
    setNewItem((previous) => {
      if (item.trim() !== "") {
        setItem("");
        return [...previous, item];
      } else {
        setItem("");
        return [...previous];
      }
    });
    //To return an ampty array in the input field
  };

  const addEvent = (event) => {
    setItem(event.target.value);
  };

  const clearAll = () => {
    setNewItem([]);
  }

  return (
    <>
      <div className="container">
        <div className="bg-white form-group border rounded mt-5">
          <h1 className="text-black text-uppercase">To Do List</h1>
          <br />
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input
              className="w-75 form-control d-inline"
              type="text"
              placeholder="Add an Item"
              value={item}
              onChange={addEvent}
            />
            <Button className="myBtn" onClick={addItem}>
              <AddIcon />
            </Button>

            <ul className="card text-align-left">
              {newItem.map((currVal, index) => {
                return (
                  <>
                    <Listing text={currVal} key={index} />
                  </>
                );
              })}
            </ul>
          </form>

          <Button onClick={clearAll} variant="contained" className="myBtn">Clear All</Button>
        </div>
      </div>
    </>
  );
}
