let insert = async function (collection, obj) {
    try {
        console.log(obj.name)
        const student = { name: obj.name, surname: obj.surname, ageOfBirth: obj.year, sex: obj.sex, address: obj.addr };
        const result = await collection.insertOne(student);
        console.log(result);
    } catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    }
}

module.exports = insert;