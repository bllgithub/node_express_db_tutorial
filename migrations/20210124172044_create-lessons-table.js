// "knex migrate:make create-lessons-table" is run in the terminal to create this file 
//  "20210124172044_create-lessons-table.js" in "migrations" folder.

// then the below code is added and after that another command is executed which is
// "knex migrate:latest" to finally create the "lessons" table in lessons.db3 with 
// primary key, "name" fields.
// "messages" table is also created with "sender", "text" and primary key fields. 

//make sure that knex has already been installed globally by the command "npm i knex -g"
//by bll, Jan 26, 2021

exports.up = function(knex) {
  return knex.schema.createTable("lessons", tbl => {
      tbl.increments()  // 'id' field
      tbl.text( "name", 128)
        .notNullable()
      tbl.timestamps(true, true)
  })
  .createTable("messages", tbl => {
      tbl.increments() // id field
      tbl
        .string("sender")
        .notNullable()
        .index()
      tbl.text("text").notNullable();
      tbl.timestamps(true, true);  

      // foreign key info 'lessons' table
      tbl
        .integer("lesson_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("lessons")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    });
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("messages")
  .dropTableIfExists("lessons")
};
