import { useState } from "react";
("use client");
import { invoke } from "@tauri-apps/api/tauri";
import React from "react";

function GetTransactions({ privilege }) {
  const [payments, setPayments] = useState("");
  async function setAllDailyTransactions() {
    setPayments(await invoke("get_all_daily_transactions", {}));
  }

  async function setAllWeeklyTransactions() {
    setPayments(await invoke("get_all_weekly_transactions", {}));
  }

  async function setAllMonthlyTransactions() {
    setPayments(await invoke("get_all_monthly_transactions", {}));
  }

  if (privilege == "MANAGER") {
    return (
      <div>
        <h2> Historical Transaction Information </h2>
        <button onClick={setAllDailyTransactions}>
          Get Daily Transactions
        </button>
        <button onClick={setAllWeeklyTransactions}>
          Get Weekly Transactions
        </button>
        <button onClick={setAllMonthlyTransactions}>
          Get Monthly Transactions
        </button>
        <div>
          <h3> {payments} </h3>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default GetTransactions;
