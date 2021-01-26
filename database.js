const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
// Read the SQL file
var dataSql = fs.readFileSync('./CourseManagmentSystem.db.sql').toString();
dataSql = dataSql.replace(/(\r\n|\n|\r)/gm, "");
var dataSqlArray = dataSql.toString().split(';');

var initialDataInsertSql = fs.readFileSync('./InitialInsertData.sql').toString();
initialDataInsertSql = initialDataInsertSql.replace(/(\r\n|\n|\r)/gm, "");
var initialDataInsertSqlArr = initialDataInsertSql.toString().split(';');

// open the database
let db = new sqlite3.Database('CourseManagmentSystem.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err
    }
    console.log('Connected to the CourseManagmentSystem database.');
});


db.serialize(() => {
    // db.run runs your SQL query against the DB
    db.run('PRAGMA foreign_keys=OFF;');
    db.run('BEGIN TRANSACTION;');
    // Loop through the `dataArr` and db.run each query
    dataSqlArray.forEach((query) => {
        if (query) {
            db.run(query, (err) => {
                if (err) {
                    console.log(err.message);
                };
            });
        }
    });
    db.run('COMMIT;');
});

db.serialize(() => {
    // db.run runs your SQL query against the DB
    db.run('PRAGMA foreign_keys=OFF;');
    db.run('BEGIN TRANSACTION;');
    // Loop through the `dataArr` and db.run each query
    initialDataInsertSqlArr.forEach((query) => {
        if (query) {
            db.run(query, (err) => {
                if (err) {
                    console.log(err.message);
                };
            });
        }
    });
    db.run('COMMIT;');
});





// export as module, called db
module.exports = db