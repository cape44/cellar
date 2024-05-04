use crate::db::connection::establish_connection;
use crate::db::models::NewPayment;
use crate::db::models::NewTask;
use crate::db::models::NewUser;

use crate::db::schema::payment;
use crate::db::schema::task;
use crate::db::schema::users;

use chrono::prelude::*;
use diesel::prelude::*;

pub fn create_user(username: String, privilege: String, password: String) {
    let new_user = NewUser {
        username: String::from(username),
        privilege: String::from(privilege),
        password: String::from(password),
    };

    diesel::insert_into(users::table)
        .values(&new_user)
        .execute(&mut establish_connection())
        .unwrap();
}

pub fn create_task(user_id: i32, customer_name: String, description: String) {
    let new_task = NewTask {
        user_id: i32::from(user_id),
        customer_name: String::from(customer_name),
        description: String::from(description),
    };

    diesel::insert_into(task::table)
        .values(&new_task)
        .execute(&mut establish_connection())
        .unwrap();
}

pub fn create_payment(fee: f64, credit: String, task: i32) {
    let date_time = Utc::now();
    let new_payment = NewPayment {
        fee: f64::from(fee),
        task_id: i32::from(task),
        date: format!("{}", date_time.format("%Y-%m-%d %H:%M:%S")),
        credit_number: String::from(credit),
    };

    diesel::insert_into(payment::table)
        .values(&new_payment)
        .execute(&mut establish_connection())
        .unwrap();
}
