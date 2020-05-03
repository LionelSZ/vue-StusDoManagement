var http = require('http');
var url = require('url');
var querystring = require('querystring');
var express = require('express');
var app = express();
var oracledb = require('oracledb');
oracledb.autoCommit = true;
var db = require('./dao/db.js');
let filter = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");　　//添加跨越访问控制
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("content-type", "application/json");
    next();
}
app.use(filter);

app.get('/getStusDo', function (req, res) {
    let ps = url.parse(req.url, true).query;
    let sql = 'select * from Stusdo  order by sId asc';
    db.query(sql, function (results) {
        console.log(results);
        res.end(JSON.stringify(results));
    });
});
app.get('/AddStusDo', function (req, res) {
    let ps = url.parse(req.url, true).query;
    let sql = `insert into Stusdo values(studo_seq.nextval,'${ps.dId}','${ps.sGender}','${ps.sName}','${ps.sDepartments}')`;
    db.query(sql, function (results) {
        console.log(results);
        res.end(JSON.stringify(results));
    });
});
app.get('/DelStusDo', function (req, res) {
    let ps = url.parse(req.url, true).query;
    let sql = `delete from stusdo where sId = ${ps.sId}`;
    db.query(sql, function (results) {
        console.log(results);
        res.end(JSON.stringify(results));
    });
});
app.get('/getDormitory', function (req, res) {
    let ps = url.parse(req.url, true).query;
    let sql = `select did,count(*) from Stusdo group by did`;
    db.query(sql, function (results) {
        console.log(results);
        res.end(JSON.stringify(results));
    });
});
app.get('/getDormitoryIn', function (req, res) {
    let ps = url.parse(req.url, true).query;
    let sql = `select did,count(*) from Stusdo group by did having count(*) < 4`;
    db.query(sql, function (results) {
        console.log(results);
        res.end(JSON.stringify(results));
    });
});
app.get('/getDormitoryNumberByDid', function (req, res) {
    let ps = url.parse(req.url, true).query;
    let sql = `select * from Stusdo where did = '${ps.dId}'`;
    console.log(sql);

    db.query(sql, function (results) {
        console.log(results);
        res.end(JSON.stringify(results));
    });
});
app.get('/ExChangeStusDo', function (req, res) {
    let ps = url.parse(req.url, true).query;
    // console.log(ps);
    db.query(`select DID from Stusdo where sid = '${ps.sId}'`, function (sId_dId) {
        // console.log(sId_dId[0].DID);
        let sql  = `update Stusdo set did = '${sId_dId[0].DID}' where sid = '${ps.sId2}' `;
        console.log(sql);
        db.query(sql, function (results) {
        });
    });
    db.query(`select DID from Stusdo where sid = '${ps.sId2}'`, function (sId_dId2) {
        // console.log(sId_dId2[0].DID);
        let sql  = `update Stusdo set did = '${sId_dId2[0].DID}' where sid = '${ps.sId}' `;
        console.log(sql);
        db.query(sql, function (results) {
        });
    });

    res.end('200');
});



app.listen('8888');

console.log('http://127.0.0.1:8888/');
