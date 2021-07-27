const express = require('express')
const db = require('./db')

const app = express()
const port = 8888

app.use(express.json())

app.listen(port, () => {
    console.log(`Application start at http://localhost:${ port }`)
})

app.get('/', (req, res) => {
    const result = {
        'Name': 'Name',
        'Description': 'Full name'
    }
    res.json(result)
})

app.post('/insert', (req, res) => {
    const { Name, Description } = req.body
    // const Name = req.body.Name 
    // const Description = req.body.Description
    const statement = db.prepare('INSERT INTO table1 (Name, Description) VALUES (?, ?)')
    const info = statement.run(Name, Description)
    console.log(req.ip)
    console.log(`Insert ${Name}`)
    console.log(`Insert ${Description}`)
    res.json(info)
})

app.get('/table1', (req, res) => {
    const statement = db.prepare("SELECT * FROM table1")
    const table1 = statement.all()
    console.log(req.ip)
    console.log('Get table')
    res.json(table1)
})

app.get('/table1/:ID', (req, res) => {
    const { ID } = req.params
    // const ID = req.params.ID
    const statement = db.prepare(`SELECT * FROM table1 WHERE ID = ${ID}`)
    const table = statement.get()
    res.json(table)
})

app.patch('/table1/:ID', (req, res) => {
    const { ID } = req.params 
    const { Name, Description } = req.body 
    const statement = db.prepare('UPDATE table1 SET Name = ?, Description = ? WHERE ID = ?')
    const info = statement.run(Name, Description, ID)
    console.log(req.ip)
    console.log(`Insert ${Name}`)
    console.log(`Insert ${Description}`)
    res.json(info)
})

app.delete('/table1/:ID', (req, res) => {
    const { ID } = req.params
    const statement = db.prepare('DELETE FROM table1 WHERE ID = ?')
    const info = statement.run(ID)
    console.log(req.ip)
    console.log(`Delete ${ID}`)
    res.json(info)
})
