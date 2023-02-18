import React, { useEffect, useState } from "react";
import "./TodoList.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Listing from "./Listing";

export default function TodoList() {
  //Function to fetch the local storage
  const getItem = () => {
    let list = localStorage.getItem('newItem');
    console.log('list:', list);

    if(list) return JSON.parse(localStorage.getItem('newItem'));
    else return [];
  }
  
  const [item, setItem] = useState("");
  const [newItem, setNewItem] = useState(getItem());

  
  const addItem = () => {
    //To save the previous inputs and also add new inputs to the array
    setNewItem((previous) => {
      if (item.trim() !== "") {
        setItem("");
        return [...previous, { text: item, id: new Date().getTime() }];
      } else {
        setItem("");
        return [...previous];
      }
    });
  };

  //Using local storage
  useEffect(() => {
    localStorage.setItem("newItem", JSON.stringify(newItem));
  }, [newItem]);

  const addEvent = (event) => {
    setItem(event.target.value);
  };

  const clearAll = () => {
    setNewItem([]);
  };

  const updateItems = (index) => {
    //Deleting item from list
    setNewItem(() => {
      return newItem.filter((val) => {
          if(val.id === index) return setItem(val.text);
        return val.id !== index;
      });
    });
  };

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
                    <Listing
                      text={currVal.text}
                      id={currVal.id}
                      update={updateItems}
                    />
                  </>
                );
              })}
            </ul>
          </form>

          <Button onClick={clearAll} variant="contained" className="myBtn">
            Clear All
          </Button>
        </div>
      </div>
    </>
  );
}
