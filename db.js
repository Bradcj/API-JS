const Database = require('better-sqlite3')

const db = new Database('./table.sqlite')

db.exec('CREATE TABLE IF NOT EXISTS table1 (ID INTEGER PRIMARY KEY, Name TEXT, Description TEXT)')

module.exports = db