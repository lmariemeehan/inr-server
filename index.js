const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const SELECT_ALL_PROFILES_QUERY = 'SELECT * FROM inr_profiles';

const connection = mysql.createConnection({
  host: 'inrdatabase.covyw4q6mldi.us-west-2.rds.amazonaws.com',
  user: 'root',
  password: 'Mysqlvikings1',
  database: 'innodb'
})

connection.connect(err => {
  if(err) {
    return err;
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('go to /inr_profiles to see profiles')
});

app.get('/inr_profiles', (req, res) => {
  connection.query(SELECT_ALL_PROFILES_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

app.listen(4000, () => {
  console.log('db listening on port 4000');
})
