
const client = require('../database/');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
 const { createToken } = require('../utils');



const signup =   (user) => {
  return new Promise((resolve, reject) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      reject(err,{message: 'Error',token: err}) 
    } else {

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          throw err
        } else {
          console.log(hash)
          resolve({ message: 'Signup exitoso',token:hash})
         client
    .query(`insert into usuarios(nombre,Apellidos, RFC,RazonSocial,Usuario, correo,contraseña) values ('${user.first_name}','${user.last_name}','${user.rfc}','${user.razonsocial}','${user.user}','${user.email}', '${hash}')`); 
    console.log("el response",user)
        }
      })
    }
  })
});
};

const  login = async (email,password) => {

  return new Promise((resolve, reject) => {
    client
    .query(`select correo,contraseña from  usuarios where correo='${email}' `,
    
   function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 

    bcrypt.compare(password,resultados[0].contraseña, function(err, result) {
      console.log("password" ,password)
      
       if(result){
        resolve({
                message: 'Login exitoso',
               token: createToken( resultados[0].correo, resultados[0].contraseña)
              });
              return result
      }
    })
    },
  )
  })
  }

const registerEm =  async (data) => {
  const response = await client
 .query(`insert into empleados (nombre,ApellidoP,ApellidoM,Curp,RFC,Sexo,CP) values ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}')`); 
  return  response
};


const registerRazonS = async data => {
  const response = await client
   .query(`insert into clientes (RFC,Razon_social,Empleados,Representante,Direccion,Telefono,Correo) values ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}')`); 
   return  response

};



const  getUsers = async (args) => {

return new Promise((resolve, reject) => {

  client.query({
    sql: 'SELECT * FROM `usuarios` WHERE `correo` = ?',
    timeout: 40000, // 40s
  },
  [`${args.email}`],
  
 function fun (error, results, fields) {

    if (error) reject(error)
    console.log("error" ,  error)
    var string=JSON.stringify(results);
    var resultados =  JSON.parse(string); 
    resolve(resultados)
  }
)
})
}

module.exports = {
  signup,
  login,
  registerEm,
  registerRazonS,
   getUsers
}