
// const {Client} = require('pg')
// const connectionData={
//     user:'postgres',
//     host:'',
//     database:'ADS',
//     password:'jesus33.',
//     port:5432,
//     }

// const client = new Client(connectionData);

// client.connect()

// .then(res=>{

//     console.log("conectado al servicio de Postgresql")
    
// })

// .catch(err=>{
//     console.log(err)
   
// })

// module.exports=client;


var mysql = require('mysql');

var  pool = mysql.createPool({

  database:"heroku_e815156f37933c9",
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "b32fbf2647107b",
  password: "57e93245",
  port: '3306',
  
});

var DB = (function () {

  function _query(query, params, callback) {
      pool.getConnection(function (err, connection) {
          if (err) {
              connection.release();
              callback(null, err);
              throw err;
          }

          connection.query(query, params, function (err, rows) {
              connection.release();
              if (!err) {
                  callback(rows);
              }
              else {
                  callback(null, err);
              }

          });

          connection.on('error', function (err) {
              connection.release();
              callback(null, err);
              throw err;
          });
      });
  };

  return {
      query: _query
  };
})();

module.exports = DB;