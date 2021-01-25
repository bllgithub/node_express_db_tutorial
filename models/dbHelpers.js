const knex = require("knex")
const config = require("../knexfile");
const db = knex(config.development);

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

async function add(lesson) {
    const [id] = await db("lessons").insert(lesson);
    return id;
}

async function read() {
    return await db("lessons") // this "lessons" refers to the database name and not to table lessons
}

async function findById(id) {
    return await db("lessons")
        .where({id}) // or .where({id:id}) 
        .first();
}

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
    const [id] = await db("messages")
        .where({ lesson_id })
        .insert(message);
    return findMessageById(id);
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