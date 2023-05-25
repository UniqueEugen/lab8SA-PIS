let find = async function (collection, numB) {
    try {
        let cond = { ageOfBirth: { $lte: numB.year2 } };
        let res = await collection.find(cond).toArray();
        return res;
    } catch (err) {
        console.log("Возникла ошибка");
        console.log(err);
    }
}
let showSt = async function (collection) {
    try {
        let res = await collection.find().toArray();
        let st = [];
        for (let i = 0; i < res.length; i++) {
            st.push({ id: res[i]._id, name: res[i].name + " " + res[i].surname });
        }
        console.log(st);
        return { st: st, all: res };
    } catch (err) {
        console.log("Возникла ошибка");
        console.log(err);
    }
}
module.exports = {
    find,
    showSt
};