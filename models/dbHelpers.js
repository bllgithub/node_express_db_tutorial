const knex = require("knex")
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
    add,
    read,
    findById,
    remove,
    update
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