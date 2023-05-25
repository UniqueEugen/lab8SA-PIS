let del = async function (collection, obj) {
    try {
        const result = await collection.deleteMany({ sex: obj.sex });
        console.log(result);
    } catch (err) {
        console.log("Возникла ошибка");
        console.log(err);
    }
}

module.exports = del;