import { useState } from "react";
("use client");
import { invoke } from "@tauri-apps/api/tauri";
import React from "react";

// Task (user_id: String, customer_name: String

function TicketRender({ currentID, currentPrivilege }) {
  const [customerName, setCustomerName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDisplayMsg, setTaskDisplayMsg] = useState("");
  const [allTasks, setAllTasks] = useState("");

  async function addNewTask() {
    await invoke("c_create_task", {
      user: currentID,
      customer: customerName,
      desc: taskDescription,
    });
  }
  async function setDisplayMsgForTaskPage() {
    setTaskDisplayMsg("Task created");
  }

  async function getAndSetAllTasks() {
    if (currentPrivilege == "MANAGER") {
      setAllTasks(await invoke("get_all_tasks_as_string", {}));
    } else {
      setAllTasks("You must be MANAGER for this feature");
    }
  }
  if (currentPrivilege != "VIEW" && currentPrivilege != "User not found") {
    return (
      <div>
        <h2 className="weightDown"> Add task </h2>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            if (currentID == "" || currentID == "User not found") {
              setTaskDisplayMsg("Please log in first");
            } else {
              addNewTask();
              setDisplayMsgForTaskPage();
            }
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setCustomerName(e.currentTarget.value)}
            placeholder="Enter the customer's name..."
          />
          <input
            id="greet-input"
            onChange={(e) => setTaskDescription(e.currentTarget.value)}
            placeholder="Enter the task description..."
          />
          <button type="submit">Create user</button>
        </form>
        <div clas="transactions">
          <button onClick={getAndSetAllTasks}>Get Tasks</button>
        </div>
        <p className="smile"> {taskDisplayMsg} </p>
        <p className="smile"> {allTasks} </p>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="weightDown"> Login to use this feature </h2>
      </div>
    );
  }
}
export default TicketRender;
