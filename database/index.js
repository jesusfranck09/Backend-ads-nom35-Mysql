
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

var con = mysql.createConnection({
  database:"heroku_e815156f37933c9",
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "b32fbf2647107b",
  password: "57e93245",
  port: '3306',
  
});


function handleDisconnect() {

  con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }  
    console.log("Connected!");                                   // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
 module.exports=con;
 
// var mysql = require('mysql');

// var  pool = mysql.createPool({

//   database:"heroku_e815156f37933c9",
//   host: "us-cdbr-iron-east-04.cleardb.net",
//   user: "b32fbf2647107b",
//   password: "57e93245",
//   port: '3306',
  
// });

// var DB = (function () {

//   function _query(query, params, callback) {
//       pool.getConnection(function (err, connection) {
//           if (err) {
//               connection.release();
//               callback(null, err);
//               throw err;
//           }

//           connection.query(query, params, function (err, rows) {
//               connection.release();
//               if (!err) {
//                   callback(rows);
//               }
//               else {
//                   callback(null, err);
//               }

//           });

//           connection.on('error', function (err) {
//               connection.release();
//               // callback(null, err);
//               throw err;
//           });
//       });
//   };

//   return {
//       query: _query
//   };
// })();

// module.exports = DB;