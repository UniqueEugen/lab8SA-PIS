let del = async function (collection, obj) {
    try {
        const result = await collection.deleteMany({ sex: obj.sex });
        console.log(result);
    } catch (err) {
        console.log("�������� ������");
        console.log(err);
    }
}

module.exports = del;