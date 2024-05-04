import { useState } from "react";
("use client");
import "./App.css";

import Tabs from "./components/Tabs";

import React from "react";
import Commander from "./Commander";

function App() {
  //get_all_tasks_as_string
  const [currentName, setCurrentName] = useState("Guest");
  const [currentID, setCurrentID] = useState("");
  const [currentPrivilege, setCurrentPrivilege] = useState("VIEW");
  const [currentTab, setCurrentTab] = useState("");

  return (
    <div class="container">
      <Tabs
        currentName={currentName}
        currentPrivilege={currentPrivilege}
        setTabState={(e) => {
          setCurrentTab(e);
        }}
      />

      <Commander
        renderName={currentTab}
        currentName={currentName}
        currentPrivilege={currentPrivilege}
        currentID={currentID}
        changeID={(e) => {
          setCurrentID(e);
        }}
        changeName={(e) => {
          setCurrentName(e);
        }}
        changePrivilege={(e) => {
          setCurrentPrivilege(e);
        }}
      />
    </div>
  );
}
export default App;
