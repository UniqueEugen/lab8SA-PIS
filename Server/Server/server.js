let http = require('http');
let port = process.env.PORT || 1337;
let hostname = '127.0.0.1';
const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const { create } = require('domain');
const fs = require("fs");
const insert = require("./Insert");
const del = require("./Delete");
const find = require("./Find");
const update = require("./Update");
const MongoClient = require("mongodb").MongoClient;
app.set('view enjine', 'ejs');
const createPath = (page) => path.resolve(__dirname, '../../Page1', `${page}.ejs`);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.json());
app.use(express.static('../../Page1'));
app.use(morgan(':method :url :status :res[content,-length] - :response-time ms'));
const url = "mongodb://127.0.0.1:27017/";
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient(url);

async function run1(student, collection) {
    try {
        // Подключаемся к серверу
        /*await mongoClient.connect();
        const db = mongoClient.db("StudentsDB");
        // выполняем пинг для проверки подключения
        const resultDB = await db.command({ ping: 1 });
        console.log("Подключение успешно установлено");
        console.log(resultDB);
        console.log(student);
        const collection = db.collection("Students");*/
        //console.log(collection);
        const count = await collection.countDocuments();
        console.log(`В коллекции Students ${count} документа/ов`);
        //const result = await collection.insertOne(student);
        const results = await collection.find().toArray();
        console.log(results);
    } catch (err) {
        console.log("Возникла ошибка");
        console.log(err);
    }
}

(async () => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("StudentsDB");
        console.log("Подключение успешно установлено");
        const resultDB = await db.command({ ping: 1 });
        console.log(resultDB);        
        app.locals.collection = mongoClient.db("StudentsDB").collection("Students");
        //await app.locals.collection.drop();
        app.listen(port);
        console.log("Сервер ожидает подключения...");
    } catch (err) {
        return console.log(err);
    }
})();


app.get('/', (req, res) => {
    const student = {
        name: 'Eugen',
        surname: 'Kurenkov',
        ageOfBirth: 2003,
        sex: 'demifluid',
        address: 'Belarus, Zhlobin, nbh 1, 3,34' };
    //console.log(req.app.locals.collection);
    //insert(req.app.locals.collection, student);
    run1(student, req.app.locals.collection);
    find.showSt(req.app.locals.collection).then(result => { res.render(createPath("HTML/lab8last"), { re: 0, st: result.st, mSt: result.all }); });
    
});

app.post("/newStudent", (req, res) => {
    console.log(req.body.name);
    insert(req.app.locals.collection, req.body);
    find.showSt(req.app.locals.collection).then(result => { res.render(createPath("HTML/lab8last"), { re: 0, st: result.st, mSt: result.all }); });
});
app.post("/findStudents", (req, res) => {
    let st = find.find(req.app.locals.collection, req.body);
    st.then(result => {
        console.log(result);
        find.showSt(req.app.locals.collection).then(result1 => { res.render(createPath("HTML/lab8last"), { re: result, st: result1.st, mSt: result1.all }); });
    });
});

app.post("/deleteStudent", (req, res) => {

    const collection = req.app.locals.collection;
    del(collection, req.body);
    find.showSt(req.app.locals.collection).then(result => { res.render(createPath("HTML/lab8last"), { re: 0, st: result.st, mSt: result.all }); });
});

app.post("/changeStudent", (req, res) => {
    console.log(req.body.new);
    update(req.app.locals.collection, req.body);
    find.showSt(req.app.locals.collection).then(result => { res.render(createPath("HTML/lab8last"), { re: 0, st: result.st, mSt: result.all }); });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async () => {

    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});