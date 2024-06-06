import { useState } from "react";
("use client");
import { invoke } from "@tauri-apps/api/tauri";
import React from "react";

function HelpRender() {
  return (
    <div>
      <h2 class="transactions">
        {" "}
        1. Login in the login page. Use your company ID and your password
      </h2>
      <h2>
        {" "}
        Note: If you are a new user, sign in with new credentials and ask
        manager for company ID
      </h2>
      <h2>
        2. Create a task in the taskboard. Use the customer’s name and add a
        description.
      </h2>
      <h2>
        Note: If you are a manager, you may get all the current tasks by
        clicking the get tasks button
      </h2>
      <h2>
        3. Once you have completed the task, open the payment page. Add in
        customer details and fee.
      </h2>
      <h2>
        {" "}
        Note: If you are a manager, you may get all the historical payment info
        by clicking the according button
      </h2>
    </div>
  );
}
export default HelpRender;
