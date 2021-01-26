
// "knex migrate:make createUsersTable" is run in the terminal to create this file 
//  "20210126161527_createUsersTable.js" in "migrations" folder.

// then the below code is added and after that another command is executed which is
// "knex migrate:latest" to finally create the "users" table in lessons.db3 with 
//primary key, "username" and "password" fields. 

exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments();  // 'id' field
        tbl.text("username", 128).notNullable().unique().index();
        tbl.text("password", 255).notNullable();
    })   
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};
