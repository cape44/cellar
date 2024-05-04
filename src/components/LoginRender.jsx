import { useState } from "react";
("use client");
import { invoke } from "@tauri-apps/api/tauri";

import React from "react";

function LoginRender({
  currentID,
  currentName,
  currentPrivilege,
  changeID,
  changeName,
  changePrivilege,
}) {
  const [name, setName] = useState("");
  const [displayMsg, setDisplayMsg] = useState("");
  const [privilege, setPrivilege] = useState("");
  const [internalID, setInternalID] = useState("");
  const [truePassword, setTruePassword] = useState("");
  const [triedPassword, setTriedPassword] = useState("");

  //get_all_tasks_as_string

  async function addUser() {
    await invoke("c_create_user", {
      username: name,
      privilege: privilege,
      password: truePassword,
    });
  }

  async function setUsername() {
    changeName(await invoke("c_get_user_name", { id: internalID }));
  }

  async function getTruePassword() {
    setTruePassword(await invoke("c_get_user_pass", { id: internalID }));
  }

  async function setID() {
    changeID(internalID);
  }

  async function setDisplayAfterLoggedIn() {
    setDisplayMsg("Welcome back " + currentName);
  }

  async function setIncorrectPasswordDisplay() {
    setDisplayMsg("Incorrect password.");
  }

  async function setCPrivilege() {
    changePrivilege(await invoke("c_get_user_privilege", { id: internalID }));
  }

  async function setDisplayAfterCreatedUser() {
    if (currentName != "User not found") {
      setDisplayMsg(
        "User successfully created. Talk to manager to verify and to employee key",
      );
    } else {
      setDisplayMsg("Unknown employee key. Please try again");
    }
  }
  return (
    <div>
      <h2 class="weightDown"> Login below: </h2>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          getTruePassword();
          if (triedPassword == truePassword) {
            setID();
            setUsername();
            setCPrivilege();
            setDisplayAfterLoggedIn();
          } else {
            setIncorrectPasswordDisplay();
          }
        }}
      >
        <input
          id="greet-input"
          type="number"
          onChange={(e) => setInternalID(e.currentTarget.value)}
          placeholder="Enter employee ID"
        />
        <input
          id="greet-input"
          onChange={(e) => setTriedPassword(e.currentTarget.value)}
          placeholder="Enter employee password"
        />
        <button type="submit">Apply</button>
      </form>
      <h2>
        {" "}
        Or, request to join the team! Once made, contact management to receive
        login ID.{" "}
      </h2>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
          setDisplayAfterCreatedUser();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <input
          id="greet-input"
          onChange={(e) => setTruePassword(e.currentTarget.value)}
          placeholder="Enter a password..."
        />
        <select
          id="select"
          onChange={(e) => setPrivilege(e.currentTarget.value)}
        >
          <option value="VIEW"> Please pick an option</option>
          <option value="TECH"> Technican </option>
          <option value="MANAGER"> Manager </option>
          <option value="VIEW"> View Only </option>
          "Select a privilege level..."
        </select>
        <button type="submit">Create user</button>
      </form>
      <p> {displayMsg} </p>
    </div>
  );
}
export default LoginRender;
