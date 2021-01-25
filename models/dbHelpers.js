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
    removeMessage,
    updateMessage
};

// works in postgress!
async function add(lesson) {

    return await db('lessons')
        .returning('id')
        .insert(lesson)

    // //this way of returning a value is only for sqlite3
    // const [id] = await db("lessons").insert(lesson);
    // return id;
}

// works in postgress!
async function read() {
    return await db("lessons") // this "lessons" refers to the database name and not to table lessons
}

// works in postgress!
async function findById(id) {
    return await db("lessons")
        .where({id}) // or .where({id:id}) 
        .first();
}

// works in postgress!
async function remove(id) {
    return await db("lessons")
        .where({id}) // or .where({id:id}) 
        .del();
}

async function update(id, changes) {
    return (
        await db("lessons")
            .where({id})
            .update(changes, [id])
            .then(() => {
                return findById(id);
            })

    );
}

async function findMessageById(id) {
    return await db("messages")
        .where({id}) // or .where({id:id}) 
        .first();
}

async function addMessage(message, lesson_id) {
    // this is the way portgress wants us to return value
    return await db('messages')
        .where({ lesson_id })
        .insert(message, [id])

    // //this way of returning a value is only for sqlite3
    // const [id] = await db("messages")
    //     .where({ lesson_id })
    //     .insert(message);
    // return findMessageById(id);
}

async function findLessonMessages(lesson_id) {
    return await db("lessons as l")
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

async function removeMessage(id) {
    return await db("messages")
        .where({id})
        .del()
}

async function updateMessage(id, changes) {
    return db("messages")
    .where({ id })
    .update(changes, [id])
    .then(() => {
        return findMessageById(id)
    })
}