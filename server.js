const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const md5 = require("md5");
const bcrypt = require("bcryptjs");
var app = express();
app.use(bodyparser.json());
var path = require("path");
require("dotenv").config();
const port = process.env.PORT || 5000;
// const port = 80;

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, function (req, res) {
  res.sendfile(__dirname + "/dist/index.html");
});

//webbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
app.use(bodyparser.json());
var path = require("path");
const cors = require('cors');
app.use(
  cors(),
  bodyparser.json(),
  bodyparser.urlencoded({
    extended: true
  })
);

const {
  query_command
} = require("./utilities/query_command")
console.log("Server started...");
var mysqlConnection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  port: '3306',
  password: '',
  database: 'works',
  multipleStatements: true
});
app.post("/webhook", (req, res) => {
  //console.log(req.body.events);
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

app.post('/insertMember', async (req, res) => {
  const {
    body
  } = req;
  var query1 = await query_command(`INSERT INTO MEMBER (NAME,LASTNAME,PROFILE) 
  values ('${body.NAME}','${body.LASTNAME}','${body.PROFILE}')`);
  // console.log(query1);
  var query2 = await query_command(`INSERT INTO USER (MEMBER_ID,USERNAME,PASSWORD) 
  values (${query1.insertId},'${body.USERNAME}','${md5(body.PASSWORD)}')`);
  // console.log(query2);
  res.send(query2)
});

app.post('/login', async (req, res) => {
  const {
    USERNAME,
    PASSWORD
  } = req.body;
  const results = await query_command(
    `SELECT * FROM USER WHERE STATUS = "1" AND USERNAME = '${USERNAME}' AND PASSWORD = '${md5(PASSWORD)}'`
  );
  console.log('user', results[0]);
  res.send(results);
});


app.post('/checkmember', async (req, res) => {
  const {
    body
  } = req;

  var query = await query_command(`SELECT * FROM MEMBER 
  JOIN USER ON MEMBER.MEMBER_ID = USER.MEMBER_ID
  WHERE MEMBER.MEMBER_ID = '${body.MEMBER_ID}' AND USER.STATUS = "1"`);
  //console.log(query);
  res.send(query)
});
app.post('/updateMember', async (req, res) => {
  const {
    body
  } = req;
  console.log(body);
  var query = await query_command(`UPDATE MEMBER
  SET 
  NAME = '${body.NAME}', 
  LASTNAME = '${body.LASTNAME}', 
  PROFILE = '${body.PROFILE}'
  WHERE MEMBER_ID = ${body.MEMBER_ID};`);
  console.log(query);
  res.send(query)
});

app.post('/updatePassword', async (req, res) => {
  const {
    body
  } = req;
  console.log(body);
  var query1 = await query_command(`UPDATE USER
  SET STATUS = '0'
  WHERE ID = ${body.ID};`);
  var query2 = await query_command(`INSERT INTO USER (MEMBER_ID,USERNAME,PASSWORD) 
  values (${body.MEMBER_ID},'${body.USERNAME}','${md5(body.PASSWORD)}')`);
  // console.log(query2);
  res.send(query2)
});

app.post('/checkUserpassword', async (req, res) => {
  const {
    body
  } = req;
  console.log(body);
  var query = await query_command(`SELECT * FROM USER WHERE MEMBER_ID = '${body.MEMBER_ID}' AND PASSWORD = '${md5(body.PASSWORD)}' AND STATUS = '0'
  ORDER BY ID DESC LIMIT 5`);
  
  // console.log(query2);
  res.send(query)
});

app.post('/checkUserpasswordRegister', async (req, res) => {
  const {
    body
  } = req;
  console.log(body);
  var query = await query_command(`SELECT * FROM USER WHERE USERNAME = '${body.USERNAME}' AND STATUS = '1'`);
  
  console.log(query);
  res.send(query)
});

app.listen(port);