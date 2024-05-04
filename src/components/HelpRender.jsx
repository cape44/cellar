import { useState } from "react";
("use client");
import { invoke } from "@tauri-apps/api/tauri";
import React from "react";

function HelpRender() {
  return (
    <div>
      <p> help page </p>
    </div>
  );
}
export default HelpRender;
