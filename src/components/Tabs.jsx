import React from "react";
import { useState } from "react";

function Tabs({ currentName, currentPrivilege, setTabState }) {
  async function setLoginState() {
    setTabState("Login");
  }

  async function setPaymentState() {
    setTabState("PaymentCenter");
  }

  async function setTicketState() {
    setTabState("Ticket");
  }

  async function setHelpState() {
    setTabState("Help");
  }

  return (
    <div>
      <div class="tab">
        <div class="logolol">
          <img src="./src/assets/logo.png" alt="logo" class="xlogo" />
        </div>
        <button class="tablinks" onClick={setLoginState}>
          Login
        </button>
        <button class="tablinks" onClick={setTicketState}>
          Taskboard
        </button>
        <button class="tablinks" onClick={setPaymentState}>
          Payment Center
        </button>
        <button class="tablinks" onClick={setHelpState}>
          Help
        </button>
        <div class="Information">
          <p>
            Logged in as "{currentName}" with "{currentPrivilege}" privileges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
