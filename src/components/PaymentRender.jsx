import { useState } from "react";
("use client");
import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import GetTransactions from "./GetTransactions";
// Payments

function PaymentRender({ currentPrivilege }) {
  const [fee, setFee] = useState("");
  const [creditNum, setCreditNum] = useState("");
  const [taskID, setTaskID] = useState("");
  async function addNewPayment() {
    await invoke("c_create_payment", {
      fee: fee,
      task: taskID,
      credit: creditNum,
    });
  }
  if (currentPrivilege != "VIEW" && currentPrivilege != "User not found") {
    return (
      <div>
        <h2 class="weightDown"> Enter payment information for a ticket </h2>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            addNewPayment();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setTaskID(e.currentTarget.value)}
            placeholder="Enter the task ID to pay for..."
          />
          <input
            id="greet-input"
            onChange={(e) => setFee(e.currentTarget.value)}
            placeholder="Enter the fee..."
          />
          <input
            id="greet-input"
            onChange={(e) => setCreditNum(e.currentTarget.value)}
            placeholder="Enter the customer's credit number..."
          />
          <button type="submit">Send payment</button>
        </form>
        <div class="transactions">
          <GetTransactions privilege={currentPrivilege} />
        </div>
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
export default PaymentRender;
