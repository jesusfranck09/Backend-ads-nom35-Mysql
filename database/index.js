
// var mysql = require('mysql');

// var con = mysql.createPool({
//   database:"heroku_e815156f37933c9",
//   host: "us-cdbr-iron-east-04.cleardb.net",
//   user: "b32fbf2647107b",
//   password: "57e93245",

// },
// console.log("connected!")
// )



//  module.exports=con;



 var mysql = require('mysql');

 var con = mysql.createConnection({
   database:"nom035web",
   host: "localhost",
   user: "frnk",
   password: "jesus33."
 });
 
 con.connect(function(err) {
   console.log("este es el error" ,err)
   if (err) throw err;
   console.log("Connected!");
 });
      
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