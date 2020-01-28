const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const SELECT_ALL_INRPROFILES_QUERY = 'SELECT * FROM inr_profiles';
const SELECT_ALL_INRRESULTS_QUERY = 'SELECT * FROM inr_levels';

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
  res.send('go to /inr_levels to see inr results and /inr_profiles to find profile')
});

app.get('/inr_profiles', (req, res) => {
  connection.query(SELECT_ALL_INRPROFILES_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

app.get('/inr_levels', (req, res) => {
  connection.query(SELECT_ALL_INRRESULTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

app.get('/inr_profiles/add', (req, res) => {
  const { name, email, password, low_inr, high_inr } = req.query;
  const INSERT_INRPROFILES_QUERY = `INSERT INTO inr_profiles (name, email, password, low_inr, high_inr) VALUES('${name}', '${email}', '${password}', ${low_inr}, ${high_inr})`;
  connection.query(INSERT_INRPROFILES_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    } else {
      return res.send('adding new profile');
    }
  });
});

app.get('/inr_levels/add', (req, res) => {
  const { date, inr_result, inr_notes, inr_profiles_person_id } = req.query;
  const INSERT_INRRESULTS_QUERY = `INSERT INTO inr_levels (date, inr_result, inr_notes, inr_profiles_person_id) VALUES('${date}', ${inr_result}, '${inr_notes}', ${inr_profiles_person_id})`;
  connection.query(INSERT_INRRESULTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    } else {
      return res.send('adding inr results');
    }
  });
});

app.listen(4000, () => {
  console.log('db listening on port 4000');
})
