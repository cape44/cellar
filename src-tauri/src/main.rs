// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use db::schema::task::customer_name;

use crate::db::get::get_all_task_as_string;
use crate::db::get::get_all_users_names;
use crate::db::get::get_daily_transactions;
use crate::db::get::get_monthly_transactions;
use crate::db::get::get_user;
use crate::db::get::get_weekly_transactions;
use crate::db::set::create_payment;
use crate::db::set::create_task;
use crate::db::set::create_user;

pub mod db;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn c_get_user_name(id: String) -> String {
    let new_int: i32 = id.parse().unwrap();
    return get_user(new_int).username;
}

#[tauri::command]
fn c_get_user_pass(id: String) -> String {
    let new_int: i32 = id.parse().unwrap();
    return get_user(new_int).password;
}

#[tauri::command]
fn c_get_user_privilege(id: String) -> String {
    let new_int: i32 = id.parse().unwrap();
    return get_user(new_int).privilege;
}

#[tauri::command]
fn c_create_user(username: String, privilege: String, password: String) {
    create_user(username, privilege, password);
}

#[tauri::command]
//user_id: String, customer: String, desc: String/
fn c_create_task(user: String, customer: String, desc: String) {
    let new: i32 = user.parse().unwrap();
    create_task(new, customer, desc);
}

#[tauri::command]
//user_id: String, customer: String, desc: String/
fn c_create_payment(fee: String, credit: String, task: String) {
    let newtask: i32 = task.parse().unwrap();
    let newfee: f64 = fee.parse().unwrap();
    create_payment(newfee, credit, newtask);
}

#[tauri::command]
fn get_all_daily_transactions() -> String {
    return get_daily_transactions();
}

#[tauri::command]
fn get_all_weekly_transactions() -> String {
    return get_weekly_transactions();
}

#[tauri::command]
fn get_all_monthly_transactions() -> String {
    return get_monthly_transactions();
}

#[tauri::command]
fn get_all_users_name() -> String {
    return get_all_users_names();
}

#[tauri::command]
fn get_all_tasks_as_string() -> String {
    return get_all_task_as_string();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            c_get_user_name,
            c_get_user_privilege,
            c_create_user,
            get_all_users_name,
            c_get_user_pass,
            c_create_task,
            c_create_payment,
            get_all_tasks_as_string,
            get_all_daily_transactions,
            get_all_weekly_transactions,
            get_all_monthly_transactions
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
