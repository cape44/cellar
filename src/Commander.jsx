import { useState } from "react";
("use client");
import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import TicketRender from "./components/TicketRender";
import PaymentRender from "./components/PaymentRender";
import HelpRender from "./components/HelpRender";
import LoginRender from "./components/LoginRender";

function Commander({
  renderName,
  currentName,
  currentPrivilege,
  currentID,
  changeID,
  changeName,
  changePrivilege,
}) {
  if (renderName == "Login") {
    return (
      <LoginRender
        currentID={currentID}
        currentName={currentName}
        currentPrivilege={currentPrivilege}
        changeID={changeID}
        changeName={changeName}
        changePrivilege={changePrivilege}
      />
    );
  } else if (renderName == "Ticket") {
    return (
      <TicketRender currentID={currentID} currentPrivilege={currentPrivilege} />
    );
  } else if (renderName == "PaymentCenter") {
    return <PaymentRender currentPrivilege={currentPrivilege} />;
  } else if (renderName == "Help") {
    return <HelpRender />;
  } else {
    return null;
  }
}
export default Commander;
