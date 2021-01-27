// the module where we write our queries
//const knex = require("knex")
//const config = require("../knexfile");
//const db = knex(config.development);

const db = require("../dbConfig");

module.exports = {
    add,
    read,
    findById,
    remove,
    update,
    addMessage,
    findLessonMessages,
    findMessageById,
    removeMessage,
    updateMessage,
    findAllMessages,

    addUser,
    findAllUsers,
    findUserByUsername
};

// bll note:  ['id'] for postgress, [id] for sqlite3
// "async" and "await" is used for functions with "insert" method

async function addUser(user) {
    return await db('users').insert(user, ['id'])
}

function findAllUsers() {
    return db('users')
}

function findUserByUsername(username) {
    return db('users').where({username}).first()
}

// works in postgress!
async function add(lesson) {
    //below is for postgress
    return await db('lessons')
        .returning('id')
        .insert(lesson)

    // //this way of returning a value is only for sqlite3
    // const [id] = await db("lessons").insert(lesson);
    // return id;
}

// works in postgress!
function read() {
    return db("lessons") // this "lessons" refers to the database name and not to table lessons
}

// works in postgress!
function findById(id) {
    return db("lessons")
        .where({id}) // or .where({id:id}) 
        .first();
}

// works in postgress!
function remove(id) {
    return db("lessons")
        .where({id}) // or .where({id:id}) 
        .del();
}

// works in postgress!
function update(id, changes) {

// works in postgress!
  return (
    //await db("lessons").where({id}).update(changes, [id]) this works for sqlite3
    //await db("lessons").where({id}).update(changes, ['id']) this works for postgress
    db("lessons").where({id}).update(changes, ['id'])
            .then(() => {
                return findById(id);
            })
    );
}

// works in postgress!
function findMessageById(id) {
    return db("messages")
        .where({id}) // or .where({id:id}) 
        .first();
}

// works in postgress!
function findAllMessages() {
    return db("messages")
}

// works in postgress!
async function addMessage(message, lesson_id) {
    // this is the way portgress wants us to return value
    return await db('messages')
        .where({ lesson_id })
        .insert(message, ['id']) // bll note:  ['id'] for postgress, [id] for sqlite3

    // //this way of returning a value is only for sqlite3
    // const [id] = await db("messages")
    //     .where({ lesson_id })
    //     .insert(message);
    // return findMessageById(id);
}

// works in postgress!
function findLessonMessages(lesson_id) {
    return db("lessons as l")
        .join("messages as m", "l.id", "m.lesson_id")
        .select(
            "l.id as lessonID",
            "l.name as lessonName",
            "m.id as MessageID",
            "m.sender",
            "m.text"
        )
        .where({ lesson_id })
}

// works in postgress!
function removeMessage(id) {
    return db("messages")
        .where({id})
        .del()
}

// works in postgress!
function updateMessage(id, changes) {
    return db("messages")
    .where({ id })
    .update(changes, ['id'])// bll note:  ['id'] for postgress, [id] for sqlite3
    .then(() => {
        return findMessageById(id)
    })
}