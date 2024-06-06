use crate::db::connection::establish_connection;
use crate::db::models::Payment;
use crate::db::models::Task;
use crate::db::models::User;
use crate::db::schema::payment::dsl::payment;
use crate::db::schema::task::dsl::task;
use crate::db::schema::users::dsl::users;
use chrono::prelude::*;
use chrono::{DateTime, Duration, NaiveDateTime};
use diesel::prelude::*;
use serde_json::value;

pub fn get_user(id: i32) -> User {
    let connection = &mut establish_connection();

    let user = users
        .find(id)
        .select(User::as_select())
        .first(connection)
        .optional();

    return match user {
        Ok(Some(user)) => User {
            id: user.id,
            username: user.username,
            password: user.password,
            privilege: user.privilege,
        },
        Ok(None) => User {
            id: 0,
            username: "User not found".to_string(),
            password: "User not found".to_string(),
            privilege: "User not found".to_string(),
        },
        Err(e) => User {
            id: 0,
            username: e.to_string(),
            password: e.to_string(),
            privilege: e.to_string(),
        },
    };
}

pub fn get_all_users() -> Vec<User> {
    let connection = &mut establish_connection();

    let mut vec = Vec::new();
    let obtained_users = users
        .select(User::as_select())
        .load(connection)
        .expect("Error loading posts");
    for x in obtained_users {
        vec.push(User {
            id: x.id,
            username: x.username,
            password: x.password,
            privilege: x.privilege,
        });
    }
    return vec;
}

pub fn get_all_users_names() -> String {
    let connection = &mut establish_connection();
    let mut count = 1;
    let mut str = String::new();
    let obtained_users = users
        .select(User::as_select())
        .load(connection)
        .expect("Error loading posts");
    for x in obtained_users {
        str += " ";
        str += &x.username;
        str += " ";
        str += "id: ";
        str += &count.to_string();
        count = count + 1;
    }
    return str;
}

pub fn get_all_task_as_string() -> String {
    let connection = &mut establish_connection();
    let mut str = String::new();
    let obtained_tasks = task
        .select(Task::as_select())
        .load(connection)
        .expect("Error loading posts");
    for x in obtained_tasks {
        str += " customer name: ";
        str += &x.customer_name;
        str += " user id: ";
        str += &x.user_id.to_string();
        str += " task id: ";
        str += &x.id.to_string();
        str += " || ";
    }

    return str;
}

pub fn get_daily_transactions() -> String {
    let connection = &mut establish_connection();
    let mut str = String::new();
    let obtained_payments = payment
        .select(Payment::as_select())
        .load(connection)
        .expect("Error loading posts");
    let mut total_cost: f64 = 0.0;
    for x in obtained_payments {
        let date = NaiveDateTime::parse_from_str(&x.date, "%Y-%m-%d %H:%M:%S")
            .unwrap()
            .and_utc();
        if Utc::now().signed_duration_since(date) < Duration::days(1) {
            total_cost += x.fee;
            str += " fee: ";
            str += &x.fee.to_string();
            str += " task id: ";
            str += &x.task_id.to_string();
            str += " date: ";
            str += &x.date;
            str += " credit number: ";
            str += &x.credit_number;
            str += " || ";
        }
        str += " Total payments fee: $";
        str += &total_cost.to_string();
    }
    if str == "" {
        str = "No payments found".to_string();
    }
    return str;
}

pub fn get_weekly_transactions() -> String {
    let connection = &mut establish_connection();
    let mut str = String::new();
    let obtained_payments = payment
        .select(Payment::as_select())
        .load(connection)
        .expect("Error loading posts");
    let mut total_cost: f64 = 0.0;
    for x in obtained_payments {
        let date = NaiveDateTime::parse_from_str(&x.date, "%Y-%m-%d %H:%M:%S")
            .unwrap()
            .and_utc();
        if Utc::now().signed_duration_since(date) < Duration::weeks(1) {
            total_cost += x.fee;
            str += " fee: ";
            str += &x.fee.to_string();
            str += " task id: ";
            str += &x.task_id.to_string();
            str += " date: ";
            str += &x.date;
            str += " credit number: ";
            str += &x.credit_number;
            str += " || ";
        }
    }
    str += " Total payments fee: $";
    str += &total_cost.to_string();
    if str == "" {
        str = "No payments found".to_string();
    }
    return str;
}

pub fn get_monthly_transactions() -> String {
    let connection = &mut establish_connection();
    let mut str = String::new();
    let obtained_payments = payment
        .select(Payment::as_select())
        .load(connection)
        .expect("Error loading posts");
    let mut total_cost: f64 = 0.0;
    for x in obtained_payments {
        let date = NaiveDateTime::parse_from_str(&x.date, "%Y-%m-%d %H:%M:%S")
            .unwrap()
            .and_utc();
        if Utc::now().signed_duration_since(date) < Duration::weeks(4) {
            total_cost += x.fee;
            str += " fee: ";
            str += &x.fee.to_string();
            str += " task id: ";
            str += &x.task_id.to_string();
            str += " date: ";
            str += &x.date;
            str += " credit number: ";
            str += &x.credit_number;
            str += " || ";
        }
    }
    str += " Total payments fee: $";
    str += &total_cost.to_string();
    if str == "" {
        str = "No payments found".to_string();
    }
    return str;
}
