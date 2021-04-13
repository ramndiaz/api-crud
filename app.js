const express = require('express');
const mysql = require('mysql');

//const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;

const app = express();

app.use(express.json());

//mysql
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db-fundacion-1'
});

//route
app.get('/', (req,res)=> {
    res.send('Welcome to Fundacion MAV API');
});
//customers
app.get('/customers', (req,res)=> {
    let sql = 'SELECT * FROM customers';
    connection.query(sql, (err, results)=>{
        if (err) throw err;
        if (results.length > 0){
            res.json(results);
        }else{
            res.send('Not results');
        }
    });
});
//id customers
app.get('/customers/:id', (req,res)=> {
    const {id } = req.params;

        connection.query("SELECT * FROM customers WHERE id = ?", [id], (err, results) =>{
        //connection.query("SELECT * FROM customers WHERE id = 1", (err, results) =>{
        //console.log(id);
        if (err) throw err
        if (results.length > 0){
            res.json(results);
        }else{
            res.send('Not result');
        }
    });
});

//new customer
app.post('/add', (req,res)=> {
    //const sql = 'INSERT INTO customers SET ?';
    const customerObj = {
        name: req.body.name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        mail: req.body.mail
    }
    connection.query('INSERT INTO customers SET ?', customerObj, err => {
        if(err){
            throw err;
        }else{
        res.send('Customer created');
        }
    });
});


//put customer mail
app.put('/update/:id', (req,res)=> {
    const {id } = req.params;
    const {mail } = req.body;

    connection.query('UPDATE customers SET ? WHERE id = ?', [{ mail: mail }, { id: id }], err =>{
        if(err){
            throw err;
        }else{
            res.send('Customer mail updated');
        }
    });
});


//delete customer
app.delete('/delete/:id', (req,res)=> {
    const {id } = req.params;

    connection.query("DELETE FROM customers WHERE id = ?", [id], err =>{

    if (err) throw err;
    res.send('Delete Customers');

});
});


//test connection
connection.connect(error => {
    if (error){throw error};
    {console.log('database server running!')};
});

app.listen(PORT, ()=> console.log('Server running on port ' + [PORT]));


