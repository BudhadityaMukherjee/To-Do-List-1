import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./TodoList.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Listing from "./Listing";

export default function TodoList() {
  //Function to fetch the local storage
  const getItem = () => {
    let list = localStorage.getItem("newItem");
    console.log("list:", list);

    if (list) return JSON.parse(localStorage.getItem("newItem"));
    else return [];
  };

  const [item, setItem] = useState("");
  const [newItem, setNewItem] = useState(getItem());
  const [bool, setBool] = useState(false);

  const addItem = () => {
    setBool(false);
    //To save the previous inputs and also add new inputs to the array
    setNewItem((previous) => {
      if (item.trim() !== "") {
        setItem("");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
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

  const updateAlert = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        addItem();
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const updateItems = (index) => {
    setBool(true);
    //Deleting item from list
    if (!bool) {
      setNewItem(() => {
        return newItem.filter((val) => {
          if (val.id === index) return setItem(val.text);
          return val.id !== index;
        });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Already in Update!",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
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
            <Button className="myBtn" onClick={bool ? updateAlert : addItem}>
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
