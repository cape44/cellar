use crate::db::schema::payment;
use crate::db::schema::task;
use crate::db::schema::users;
use diesel::prelude::*;

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::db::schema::users)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
    pub privilege: String,
}

#[derive(Insertable)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub username: String,
    pub privilege: String,
    pub password: String,
}

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::db::schema::payment)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Payment {
    pub id: i32,
    pub fee: f64,
    pub task_id: i32,
    pub date: String,
    pub credit_number: String,
}

#[derive(Insertable)]
#[diesel(table_name = payment)]
pub struct NewPayment {
    pub fee: f64,
    pub task_id: i32,
    pub date: String,
    pub credit_number: String,
}

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::db::schema::task)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Task {
    pub id: i32,
    pub user_id: i32,
    pub customer_name: String,
    pub description: String,
}

#[derive(Insertable)]
#[diesel(table_name = task)]
pub struct NewTask {
    pub user_id: i32,
    pub customer_name: String,
    pub description: String,
}
