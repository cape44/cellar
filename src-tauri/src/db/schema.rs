diesel::table! {
    users {
        id -> Int4,
        username -> Text,
        password -> Text,
        privilege -> Text,
    }
}

diesel::table! {
    task {
        id -> Int4,
        user_id -> Int4,
        customer_name -> Text,
        description -> Text,
    }
}

diesel::table! {
    payment {
        id -> Int4,
        fee -> Double,
        task_id -> Int4,
        date -> Text,
        credit_number -> Text
    }
}
