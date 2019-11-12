
const client = require('../database/');

const signup =  async (user) => {
    const response = await client
    .query(`insert into usuarios(nombre,Apellidos, RFC,RazonSocial,Usuario, correo,contraseña) values ('${user.first_name}','${user.last_name}','${user.rfc}','${user.razonsocial}','${user.user}','${user.email}', '${user.password}')`); 
    console.log("el response",user)
    return  response


};

const login = (email,password) => {
  return client
    .query(`select correo,contraseña from  usuarios where correo='${email}' and contraseña ='${password}'`);
  }

const registerEm =  async (data) => {
  const response = await client
 .query(`insert into empleados (nombre,ApellidoP,ApellidoM,Curp,RFC,Sexo,CP) values ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}')`); 
  return  response
};


const registerRazonS = async data => {
  const response = await client
   .query(`insert into clientes (RFC,Razon_social,Empleados,Representante,Direccion,Telefono,Correo) values ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}')`); 
  //  console.log("responseS",response)
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
  // uploadFiles,
}