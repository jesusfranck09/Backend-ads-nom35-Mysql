
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
  database:"nom35",
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