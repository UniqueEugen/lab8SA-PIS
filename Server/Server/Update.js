const mongoID = require("mongodb").ObjectId;
let update = async function (collection, obj) {
    try {
        let result;
        console.log(new mongoID(obj.student));
        switch (obj.field) {
            case 'name':
                result = await collection.updateOne({ _id: new mongoID(obj.student) }, { $set: { name: obj.new } });
                break;
            case 'surname':
                result = await collection.updateOne({ _id: new mongoID(obj.student) }, { $set: { surname: obj.new } });
                break;
            case 'ageOfBirth':
                result = await collection.updateOne({ _id: new mongoID(obj.student) }, { $set: { ageOfBirth: obj.new } });
                break;
            case 'sex':
                result = await collection.updateOne({ _id: new mongoID(obj.student) }, { $set: { sex: obj.new } });
                break;
            case 'address':
                result = await collection.updateOne({ _id: new mongoID(obj.student) }, { $set: { address: obj.new } });
                break;
            default:
                console.log('err');
                break;
        }
        console.log(result, 'dfsfsdfsf');
    } catch (err) {
        console.log("Возникла ошибка");
        console.log(err);
    }
}

module.exports = update;