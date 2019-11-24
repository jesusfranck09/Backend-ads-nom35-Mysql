
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
    .query(`insert into administrador(nombre,Apellidos, RFC,RazonSocial,Usuario, correo,contraseña) values ('${user.first_name}','${user.last_name}','${user.rfc}','${user.razonsocial}','${user.user}','${user.email}', '${hash}')`); 
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
    .query(`select * from  administrador where correo='${email}' `,
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

  // const  addfkemployees  =  (args) =>{


  //   console.log("los args son deben de ser " , args)
  //   }  


  const registerEm =  async (data) => {
    console.log("la data en useraction es " , data[20])

    return new Promise((resolve, reject) => {
      client
      .query(`select * from  administrador where correo='${data[20]}' and contraseña='${data[21]}'`,
     function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 

         console.log("los data son  " , data)
         client
        .query(`insert into empleados (nombre,ApellidoP,ApellidoM,Curp,RFC,FechaNacimiento,Sexo,CP,EstadoCivil,correo,AreaTrabajo,Puesto,Ciudad,NivelEstudios,TipoPersonal,JornadaTrabajo,TipoContratacion,TiempoPuesto,ExperienciaLaboral,RotacionTurnos,fk_administrador) values ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}', '${data[7]}', '${data[8]}', '${data[9]}', '${data[10]}', '${data[11]}', '${data[12]}', '${data[13]}', '${data[14]}', '${data[15]}', '${data[16]}', '${data[17]}', '${data[18]}', '${data[19]}','${resultados[0].id}')`); 
        return  client
      },
    )
    })

  };
  

  const registerSingleEm =  async (data) => {
    return new Promise((resolve, reject) => {
      client
      .query(`select * from  administrador where correo='${data[20]}' and contraseña='${data[21]}'`,
     function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
         client
        .query(`insert into empleados (nombre,ApellidoP,ApellidoM,Curp,RFC,FechaNacimiento,Sexo,CP,EstadoCivil,correo,AreaTrabajo,Puesto,Ciudad,NivelEstudios,TipoPersonal,JornadaTrabajo,TipoContratacion,TiempoPuesto,ExperienciaLaboral,RotacionTurnos,fk_administrador) values ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}', '${data[7]}', '${data[8]}', '${data[9]}', '${data[10]}', '${data[11]}', '${data[12]}', '${data[13]}', '${data[14]}', '${data[15]}', '${data[16]}', '${data[17]}', '${data[18]}', '${data[19]}','${resultados[0].id}')`); 
        return  client
      },
    )
    })

  };

const registerRazonS = async data => {
new Promise((resolve, reject) => {
    client
    .query(`select * from  administrador where correo='${data[7]}' and contraseña  =  '${data[8]}' `,
     function (error, results, fields) {
     if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      resolve(resultados)
       client
       .query(`insert into empleados (nombre,ApellidoP,ApellidoM,Curp,RFC,FechaNacimiento,Sexo,CP,EstadoCivil,correo,AreaTrabajo,Puesto,Ciudad,NivelEstudios,TipoPersonal,JornadaTrabajo,TipoContratacion,TiempoPuesto,ExperienciaLaboral,RotacionTurnos,fk_administrador) values ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}', '${data[7]}', '${data[8]}', '${data[9]}', '${data[10]}', '${data[11]}', '${data[12]}', '${data[13]}', '${data[14]}', '${data[15]}', '${data[16]}', '${data[17]}', '${data[18]}', '${data[19]}','${resultados[0].id}')`); 
       return  client
    },
  )
  })
};



const  getUsers = async (args) => {
return new Promise((resolve, reject) => {
  client.query({
    sql: 'SELECT * FROM `administrador` WHERE `correo` = ?',
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
  getUsers,
  registerSingleEm
}