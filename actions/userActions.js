
const client = require('../database/');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const { createToken } = require('../utils');
var nodemailer = require('nodemailer');

const signup =   (user) => {
  // console.log("fecha", new Date(new Date().toUTCString()))
  
  const utcDate2 = new Date()
  var fechaRegistro =  utcDate2.toGMTString()
  return new Promise((resolve, reject) => {
    
    if(user.email){
      console.log("user" , user)
       client.query(`insert into ventasAdminAlfa (fk_adminAlfa,fk_paquetes,fechaVenta,RazonSocial,RFC) values('${user.idAdminAlfa}','${user.paquete}','${user.fecha}','${user.razon_social}','${user.rfc}')`)
 
    client
    .query(`select * from  superusuario where correo='${user.email}'`,
    
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      if(resultados[0]){
        resolve({ message:'duplicado'})
      }else{
        client
        .query(`select * from  superusuario where rfc='${user.rfc}'`,
        function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string); 
          if(resultados[0]){
            resolve({ message:'duplicado'})
          }else{
            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
              if (err) {
                reject(err,{message: 'Error',token: err}) 
              } else {
                bcrypt.hash(user.password, salt, function(err, hash) {
                  if (err) {
                    throw err
                  } else {
                    // console.log(hash)
                    resolve({ message: 'Signup exitoso',token:hash})
                   client
                    .query(`update superusuario set nombre='${user.first_name}',Apellidos='${user.last_name}', RFC='${user.rfc}',RazonSocial ='${user.razon_social}', correo='${user.email}',contraseña='${hash}',Activo = 'true' ,fechaRegistro='${fechaRegistro}' where id = '${user.id}'`); 
                    return client
                  }
                })
              }
            })
          }
          return  client
        },
      )
      
      }   
      return  client
    },
  )
  }else{resolve({message:"no hay data"})}
});
};


const SignupAdminAlfa =   (user) => {
  // console.log("fecha", new Date(new Date().toUTCString()))
  
  const utcDate2 = new Date()
  var fechaRegistro =  utcDate2.toGMTString()
  return new Promise((resolve, reject) => {
    
    if(user.email){
    client
    .query(`select * from  adminAlfa where correo='${user.email}'`,
    
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      if(resultados[0]){
        resolve({ message:'duplicado'})
      }else{
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
          if (err) {
            reject(err,{message: 'Error',token: err}) 
          } else {
            bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) {
                throw err
              } else {
                // console.log(hash)
                resolve({ message: 'Signup exitoso',token:hash})
               client
                .query(`insert into adminAlfa (nombreAdmin,apellidosAdmin,correo,contraseña) values  ('${user.first_name}','${user.last_name}','${user.email}','${hash}')`); 
                return client
              }
            })
          }
        })
      }   
    
    },
  )
  }else{resolve({message:"no hay data"})}
});
};

const  login = async (email,password) => {
  return new Promise((resolve, reject) => {   
  if(!email || !password){
    resolve({message:"ningun dato",token:"no hay token"})
  }
    console.log("el email" , email , "password", password)
    if(email && password){
      console.log("la contraseña" , password)
      client
      .query(`select * from  superusuario where correo='${email}' `,
     function (error, results, fields) {
       if(error){
         console.log("error")
       }
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        console.log("resukltados" , resultados)    
          if(resultados[0]){
          console.log("entro")  
          bcrypt.compare(password,resultados[0].contraseña, function(err, result) {
            if(result){
              resolve({     
                message: 'Login exitoso',
               token: createToken( resultados[0].correo, resultados[0].contraseña),
               id:resultados[0].id,
               nombre:resultados[0].nombre,
               Apellidos:resultados[0].Apellidos,
               RFC:resultados[0].RFC,
               RazonSocial:resultados[0].RazonSocial,
               Usuario:resultados[0].Usuario,
               correo:resultados[0].correo,
               activo:resultados[0].activo
              });
              return result
            }else{
              resolve({message:"usuario y contraseña incorrectos",token:"no hay token"})
            }       
        })
      }else{
        console.log("no entro")  
        resolve({message:"usuario y contraseña incorrectos",token:"no hay token"})
      }
      },
    )
    }  
  })
  }

  const  LoginAdminAlfa = async (email,password) => {
    return new Promise((resolve, reject) => {   
    if(!email || !password){
      resolve({message:"ningun dato",token:"no hay token"})
    }
      if(email && password){
        client
        .query(`select * from  adminAlfa where correo='${email}' `,
       function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string); 
            if(resultados[0]){
            bcrypt.compare(password,resultados[0].contraseña, function(err, result) {
              if(result){
                resolve({     
                  message: 'Login exitoso',
                 token: createToken( resultados[0].correo, resultados[0].contraseña),
                 id:resultados[0].id,
                });
                return result
              }else{
                resolve({message:"usuario y contraseña incorrectos",token:"no hay token"})
              }       
          })
        }else{
          console.log("no entro")  
          resolve({message:"usuario y contraseña incorrectos",token:"no hay token"})
        }
        },
      )
      }  
    })
    }
  const  LoginEmpresas = async (rfc,password) => {
    
    
  return new Promise((resolve, reject) => {
    console.log("rfc", rfc,"password"  , password)
    if(!rfc || !password){
      console.log("no hay token nun¿infin dato")
      resolve({message:"ningun dato",token:"no hay token"})
  
    }

      if(rfc,password){
        console.log("la contraseña" , password)
        client
        .query(`select * from  administrador where RFC='${rfc}'`,
       function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string); 
          console.log("resukltados" , resultados)    
            if(resultados[0]){
            console.log("entro")  
            bcrypt.compare(password,resultados[0].contraseña, function(err, result) {
  
              if(result){
                resolve({
                
                  message: 'Login exitoso',
                  token: createToken( resultados[0].correo, resultados[0].contraseña),
                  id:resultados[0].id,
                  nombre:resultados[0].nombreAdmin,
                  Apellidos:resultados[0].Apellidos,
                  RFC:resultados[0].RFC,
                  RazonSocial:resultados[0].RazonSocial,
                  Usuario:resultados[0].Usuario,
                  correo:resultados[0].correo,
                  activo:resultados[0].activo,
                  fechaRegistro:resultados[0].fechaRegistro
                });
                return result
              }else{
                resolve({message:"usuario y contraseña incorrectos",token:"no hay token"})
              }
               
          })
        }else{
          console.log("no entro")  
          resolve({message:"usuario y contraseña incorrectos",token:"no hay token"})
        }
          
         
        },
      )
      }
     
    })
    }
    const registerEm =  async (data) => {
      console.log("data register single em" , data)
      return new Promise((resolve, reject) => {
        client
        .query(`select * from  empleados where correo='${data[9]}'  and fk_administrador='${data[21]}'`,
        function (error, results, fields) {
          if(resultados){
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string); 
            console.log("resultados resu", resultados)
            resolve({message:"correo existente"})
          }else{
            client
            .query(`select * from sucursales where fk_administrador = '${data[21]}' and nombreSucursal='${data[20]}' `,
             function (error, results, fields) {
             if (error) reject(error) 
             console.log("resultados sucursales" , `select * from sucursales where fk_administrador = '${data[21]}' and nombreSucursal='${data[20]}' `)
             console.log("resultados de la consulta suc" , results)
             var string=JSON.stringify(results);
             var resultados =  JSON.parse(string); 
             if(resultados[0]){
              client
              .query(`select * from departamentos where fk_administrador = '${data[21]}' and nombre='${data[10]}' `,
            
              function (error, results, fields) {
               if (error) reject(error) 
               console.log("query dep",`select * from departamentos where fk_administrador = '${data[21]}' and nombre='${data[10]}' `) 
               var strings=JSON.stringify(results);
                var result=  JSON.parse(strings); 
                console.log("resultados de la consulta dep" , results)
               if(result[0]){
                client
                .query(`select * from puestos where fk_administrador = '${data[21]}' and nombre='${data[11]}' `,
                 function (error, results, fields) {
                 if (error) reject(error) 
                 var stringss=JSON.stringify(results);
                 var resu =  JSON.parse(stringss); 
                 console.log("querypuestos",`select * from puestos where fk_administrador = '${data[21]}' and nombre='${data[11]}' `)
                 console.log("resultados de la consulta pue" , results)
                 if(resu[0]){
                  client
                  .query(`insert into empleados (nombre,ApellidoP,ApellidoM,Curp,RFC,FechaNacimiento,Sexo,CP,EstadoCivil,CentroTrabajo,correo,AreaTrabajo,Puesto,Ciudad,NivelEstudios,TipoPersonal,JornadaTrabajo,TipoContratacion,TiempoPuesto,ExperienciaLaboral,RotacionTurnos,fk_administrador,ATSContestado,RPContestado,EEOContestado,ATSDetectado,EmpleadoActivo) values ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}', '${data[7]}', '${data[8]}', '${data[20]}','${data[9]}', '${data[10]}', '${data[11]}', '${data[12]}', '${data[13]}', '${data[14]}', '${data[15]}', '${data[16]}', '${data[17]}', '${data[18]}', '${data[19]}','${data[21]}','false','false','false','false','true')`); 
                  resolve({
                    message: 'registro exitoso',
                  });

                 }else{
                  resolve({
                    message: 'el puesto no existe',
                  });
                 }
                },
              )
               }else{
                resolve({
                  message: 'el departamento no existe',
                });
               }
              },
            )
             }else{
              resolve({
                message: 'la sucursal no existe',
              });
             }
            },
          )
            
          } 
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


const AtsPage1 = async data => {
console.log("el correo en atspage1 es " ,data[1])
return new Promise((resolve, reject) => {

if(data[0]=="si"){
  client
  .query(`select * from  empleados where correo='${data[1]}'`,
    function (error, results, fields) {
    if (error) reject(error) 
    var string=JSON.stringify(results);
    var resultados =  JSON.parse(string); 
    resolve(resultados)
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','1','${resultados[0].id}','${data[2]}')`); 
      client.query(`update empleados set ATSDetectado='true' where id = ${resultados[0].id} `);    
    
      client
        .query(`select Max(id) as idMaximo from  correos where fk_empleados='${resultados[0].id}' and encuesta = "ATS"`,
          function (error, redults, fields) {
          var string=JSON.stringify(redults);
        var resultados1 =  JSON.parse(string); 
        resolve(resultados1)                
        var maximo = resultados1[0].idMaximo
        client.query(`update correos set contestado ='true' where id = ${maximo} `);    
        client.query(`update empleados set ATSContestado ='true' where correo ='${data[1]}' `);  
        return client   

        }
        
        )
    
      return  client       
  },
)
} 
if(data[0]=="no"){
  client
  .query(`select * from  empleados where correo='${data[1]}'`,
  function (error, results, fields) {
  if (error) reject(error) 
    var string=JSON.stringify(results);
    var resultados =  JSON.parse(string); 
    resolve(resultados)
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','1','${resultados[0].id}','${data[2]}')`); 
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','2','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','3','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','4','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','5','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','6','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','7','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','8','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','9','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','10','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','11','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','12','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','13','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','14','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','15','${resultados[0].id}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','16','${resultados[0].id}','${data[2]}')`);
      client.query(`update empleados set ATSContestado='true' where id = ${resultados[0].id} `);
      client.query(`insert into periodos(fk_empleados,periodo,encuesta) values ('${resultados[0].id}','${data[2]}','ATS')`);    
      
      return  client       
  },
)
}  })
};


const AtsPage2 = async data => {
console.log("la data en useractios es  " ,   data)
return new Promise((resolve, reject) => {
    client
    .query(`select * from  empleados where correo='${data[2]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      resolve(resultados)
        client
        .query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','2','${resultados[0].id}','${data[3]}')`); 
        client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[1]}','3','${resultados[0].id}','${data[3]}')`); 
        return  client        
    },
  )
  })
};

const AtsPage3 = async data => {
  var resultados=""
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[7]}'`,
        function (error, results, fields) {
        if (error) reject(error) 
        var string=JSON.stringify(results);
        resultados =  JSON.parse(string); 
        resolve(resultados)
        console.log("los resultados de la primera consulta son " , resultados)
          client
          .query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','4','${resultados[0].id}','${data[8]}')`); 
          client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[1]}','5','${resultados[0].id}','${data[8]}')`); 
          client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[2]}','6','${resultados[0].id}','${data[8]}')`); 
          client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[3]}','7','${resultados[0].id}','${data[8]}')`); 
          client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[4]}','8','${resultados[0].id}','${data[8]}')`); 
          client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[5]}','9','${resultados[0].id}','${data[8]}')`); 
          client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[6]}','10','${resultados[0].id}','${data[8]}')`); 

          return  client   
              
      },
    )

    // client.query(`select Max(id) from correos where fk_empleados=${resultados[0].id}}'`,
    // function (error, resultss, fields) {
    // if (error) reject(error) 
    
    //  resolve(resultss)
    //  console.log(`select Max(id) from correos where fk_empleados=${resultados[0].id}}'`)
    //  console.log("resultadores" , resultss)
    // })

    })
  };

const AtsPage4 = async data => {      
  console.log("atspage4" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[5]}'`,
        function (error, results, fields) {
        if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client
          .query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','12','${resultados[0].id}','${data[6]}')`); 
          client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[1]}','13','${resultados[0].id}','${data[6]}')`); 
          client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[2]}','14','${resultados[0].id}','${data[6]}')`); 
          client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[3]}','15','${resultados[0].id}','${data[6]}')`); 
          client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[4]}','16','${resultados[0].id}','${data[6]}')`);      
          client.query(`insert into periodos(fk_empleados,periodo,encuesta) values ('${resultados[0].id}','${data[6]}','ATS')`);    
   
          return  client        
      },
    )
    })
  };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
const RPPage1 = async data => {
  
  console.log("useractions RPpage1" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[9]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve({message:"datos guardados"})
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','1','${resultados[0].id}','${data[10]}','${data[11]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[1]}','2','${resultados[0].id}','${data[10]}','${data[12]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[2]}','3','${resultados[0].id}','${data[10]}','${data[13]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[3]}','4','${resultados[0].id}','${data[10]}','${data[14]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[4]}','5','${resultados[0].id}','${data[10]}','${data[15]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[5]}','6','${resultados[0].id}','${data[10]}','${data[16]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[6]}','7','${resultados[0].id}','${data[10]}','${data[17]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[7]}','8','${resultados[0].id}','${data[10]}','${data[18]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[8]}','9','${resultados[0].id}','${data[10]}','${data[19]}')`); 

          client.query(`select Max(id) as idMaximo from  correos where fk_empleados='${resultados[0].id}' and encuesta = "RP"`,
          function (error, redults, fields) {
          var string=JSON.stringify(redults);
          var resultados1 =  JSON.parse(string); 
          resolve(resultados1)                
          var maximo = resultados1[0].idMaximo
          client.query(`update correos set contestado ='true' where id = ${maximo} `);    
          client.query(`update empleados set RPContestado ='true' where correo ='${data[9]}'`);   
          return client    
          }
          
          )
          return  client       
      },
    )
    })
  };

const RPPage2 = async data => {

  console.log("useractions RPpage2" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[4]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','10','${resultados[0].id}','${data[5]}','${data[6]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[1]}','11','${resultados[0].id}','${data[5]}','${data[7]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[2]}','12','${resultados[0].id}','${data[5]}','${data[8]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[3]}','13','${resultados[0].id}','${data[5]}','${data[9]}')`);            
          return  client       
      },
    )
    })
  };

const RPPage3 = async data => {

  console.log("useractions RPpage3" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[4]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','14','${resultados[0].id}','${data[5]}','${data[6]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[1]}','15','${resultados[0].id}','${data[5]}','${data[7]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[2]}','16','${resultados[0].id}','${data[5]}','${data[8]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[3]}','17','${resultados[0].id}','${data[5]}','${data[9]}')`);            
          return  client       
      },
    )
    })
  };

            
const RPPage4 = async data => {

  console.log("useractions RPpage4" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[5]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','18','${resultados[0].id}','${data[6]}','${data[7]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[1]}','19','${resultados[0].id}','${data[6]}','${data[8]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[2]}','20','${resultados[0].id}','${data[6]}','${data[9]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[3]}','21','${resultados[0].id}','${data[6]}','${data[10]}')`);            
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[4]}','22','${resultados[0].id}','${data[6]}','${data[11]}')`);            

          return  client       
      },
    )
    })
  };

const RPPage5 = async data => {

  console.log("useractions RPpage4" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[5]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','23','${resultados[0].id}','${data[6]}','${data[7]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[1]}','24','${resultados[0].id}','${data[6]}','${data[8]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[2]}','25','${resultados[0].id}','${data[6]}','${data[9]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[3]}','26','${resultados[0].id}','${data[6]}','${data[10]}')`);            
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[4]}','27','${resultados[0].id}','${data[6]}','${data[11]}')`);            

          return  client       
      },
    )
    })
  };

const RPPage6 = async data => {

  console.log("useractions RPpage4" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[13]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','28','${resultados[0].id}','${data[14]}','${data[15]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[1]}','29','${resultados[0].id}','${data[14]}','${data[16]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[2]}','30','${resultados[0].id}','${data[14]}','${data[17]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[3]}','31','${resultados[0].id}','${data[14]}','${data[18]}')`);            
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[4]}','32','${resultados[0].id}','${data[14]}','${data[19]}')`);            
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[5]}','33','${resultados[0].id}','${data[14]}','${data[20]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[6]}','34','${resultados[0].id}','${data[14]}','${data[21]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[7]}','35','${resultados[0].id}','${data[14]}','${data[22]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[8]}','36','${resultados[0].id}','${data[14]}','${data[23]}')`);            
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[9]}','37','${resultados[0].id}','${data[14]}','${data[24]}')`);            
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[10]}','38','${resultados[0].id}','${data[14]}','${data[25]}')`);            
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[11]}','39','${resultados[0].id}','${data[14]}','${data[26]}')`);            
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[12]}','40','${resultados[0].id}','${data[14]}','${data[27]}')`);            

          return  client       
      },
    )
    })
  };

const RPPage7 = async data => {

  console.log("useractions RPpage4" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[3]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','41','${resultados[0].id}','${data[4]}','${data[5]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[1]}','42','${resultados[0].id}','${data[4]}','${data[6]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[2]}','43','${resultados[0].id}','${data[4]}','${data[7]}')`); 

          return  client       
      },
    )
    })
  };

const RPPage8 = async data => {

  console.log("useractions RPpage4" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[3]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','44','${resultados[0].id}','${data[4]}','${data[5]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[1]}','45','${resultados[0].id}','${data[4]}','${data[6]}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[2]}','46','${resultados[0].id}','${data[4]}','${data[7]}')`); 
          client.query(`insert into periodos(fk_empleados,periodo,encuesta) values ('${resultados[0].id}','${data[4]}','RP')`);
          
      return  client       
      },
    )
    })
  };
  

const RPValidadorPage7 = async data => {

  console.log("useractions RPValidadorPage7" , data)
  return new Promise((resolve, reject) => {
    
      client
      .query(`select * from  empleados where correo='${data[1]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)

        if(data[0]=="si"){
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','48','${resultados[0].id}','${data[2]}','${0}')`); 
          return  client   
        }  else if(data[0]=="no"){
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','48','${resultados[0].id}','${data[2]}','${0}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('No','41','${resultados[0].id}','${data[2]}','${0}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('No','42','${resultados[0].id}','${data[2]}','${0}')`); 
          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('No','43','${resultados[0].id}','${data[2]}','${0}')`); 
        }     
      },
    )
 
    })
  };

const RPValidadorPage8 = async data => {

console.log("useractions RPValidadorPage8" , data)
return new Promise((resolve, reject) => {
    client
    .query(`select * from  empleados where correo='${data[1]}'`,
    function (error, results, fields) {
    if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      resolve(resultados)
      
      if(data[0]=="si"){
        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','49','${resultados[0].id}','${data[2]}','${0}')`); 
        return  client    
      }else if(data[0]=="no"){
        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[0]}','49','${resultados[0].id}','${data[2]}','${0}')`); 
        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('No','44','${resultados[0].id}','${data[2]}','${0}')`); 
        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('No','45','${resultados[0].id}','${data[2]}','${0}')`); 
        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('No','46','${resultados[0].id}','${data[2]}','${0}')`); 
        client.query(`insert into periodos(fk_empleados,periodo,encuesta) values ('${resultados[0].id}','${data[2]}','RP')`);

        client.query(`select Max(id) as idMaximo from  correos where fk_empleados='${resultados[0].id}' and encuesta = "RP"`,
        function (error, redults, fields) {
        var string=JSON.stringify(redults);
        var resultados1 =  JSON.parse(string); 
        resolve(resultados1)                
        var maximo = resultados1[0].idMaximo
        client.query(`update correos set contestado ='true' where id = ${maximo} `);    
        client.query(`update empleados set RPContestado ='true' where correo ='${data[1]}'`);   
        return client    
        }
        
        )
      }    
        
    },
  )
  })
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
const EEOPage1 = async data => {
        
  console.log("useractions eEOpage1" , data)

  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[5]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','1','${resultados[0].id}','${data[6]}','${data[7]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','2','${resultados[0].id}','${data[6]}','${data[8]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','3','${resultados[0].id}','${data[6]}','${data[9]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','4','${resultados[0].id}','${data[6]}','${data[10]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[4]}','5','${resultados[0].id}','${data[6]}','${data[11]}')`); 
          
          
          client
          .query(`select Max(id) as idMaximo from  correos where fk_empleados='${resultados[0].id}' and encuesta = "EEO"`,
            function (error, redults, fields) {
            var string=JSON.stringify(redults);
          var resultados1 =  JSON.parse(string); 
          resolve(resultados1)                
          var maximo = resultados1[0].idMaximo
          client.query(`update correos set contestado ='true' where id = ${maximo} `); 
          client.query(`update empleados set EEOContestado ='true' where correo = '${data[5]}'`);    
          return client    
          }
          
          )
          
          return  client       
      },
    )
    })
  };

const EEOPage2 = async data => {
      
  console.log("useractions eEOpage2" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[3]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','6','${resultados[0].id}','${data[4]}','${data[5]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','7','${resultados[0].id}','${data[4]}','${data[6]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','8','${resultados[0].id}','${data[4]}','${data[7]}')`);   
          return  client       
      },
    )
    })
  };
const EEOPage3 = async data => {
    
  console.log("useractions eEOpage3" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[4]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','9','${resultados[0].id}','${data[5]}','${data[6]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','10','${resultados[0].id}','${data[5]}','${data[7]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','11','${resultados[0].id}','${data[5]}','${data[8]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','12','${resultados[0].id}','${data[5]}','${data[9]}')`); 

          return  client       
      },
    )
    })
  };


const EEOPage4 = async data => {
  
  console.log("useractions eEOpage4" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[4]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','13','${resultados[0].id}','${data[5]}','${data[6]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','14','${resultados[0].id}','${data[5]}','${data[7]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','15','${resultados[0].id}','${data[5]}','${data[8]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','16','${resultados[0].id}','${data[5]}','${data[9]}')`); 

          return  client       
      },
    )
    })
  };

const EEOPage5 = async data => {

  console.log("useractions eEOpage5" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[6]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','17','${resultados[0].id}','${data[7]}','${data[8]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','18','${resultados[0].id}','${data[7]}','${data[9]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','19','${resultados[0].id}','${data[7]}','${data[10]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','20','${resultados[0].id}','${data[7]}','${data[11]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[4]}','21','${resultados[0].id}','${data[7]}','${data[12]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[5]}','22','${resultados[0].id}','${data[7]}','${data[13]}')`); 

          return  client       
      },
    )
    })
};

const EEOPage6 = async data => {

  console.log("useractions eEOpage5" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[6]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','23','${resultados[0].id}','${data[7]}','${data[8]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','24','${resultados[0].id}','${data[7]}','${data[9]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','25','${resultados[0].id}','${data[7]}','${data[10]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','26','${resultados[0].id}','${data[7]}','${data[11]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[4]}','27','${resultados[0].id}','${data[7]}','${data[12]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[5]}','28','${resultados[0].id}','${data[7]}','${data[13]}')`); 

          return  client       
      },
    )
    })
  };

const EEOPage7 = async data => {

  console.log("useractions eEOpage5" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[2]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','29','${resultados[0].id}','${data[3]}','${data[4]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','30','${resultados[0].id}','${data[3]}','${data[5]}')`); 

          return  client       
      },
    )
    })
};

const EEOPage8 = async data => {

  console.log("useractions eEOpage5" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[6]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','31','${resultados[0].id}','${data[7]}','${data[8]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','32','${resultados[0].id}','${data[7]}','${data[9]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','33','${resultados[0].id}','${data[7]}','${data[10]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','34','${resultados[0].id}','${data[7]}','${data[11]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[4]}','35','${resultados[0].id}','${data[7]}','${data[12]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[5]}','36','${resultados[0].id}','${data[7]}','${data[13]}')`); 

          return  client       
      },
    )
    })
  };

const EEOPage9 = async data => {

  console.log("useractions eEOpage5" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[5]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','37','${resultados[0].id}','${data[6]}','${data[7]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','38','${resultados[0].id}','${data[6]}','${data[8]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','39','${resultados[0].id}','${data[6]}','${data[9]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','40','${resultados[0].id}','${data[6]}','${data[10]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[4]}','41','${resultados[0].id}','${data[6]}','${data[11]}')`); 

          return  client       
      },
    )
    })
  };
const EEOPage10 = async data => {

  console.log("useractions eEOpage10" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[5]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','42','${resultados[0].id}','${data[6]}','${data[7]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','43','${resultados[0].id}','${data[6]}','${data[8]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','44','${resultados[0].id}','${data[6]}','${data[9]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','45','${resultados[0].id}','${data[6]}','${data[10]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[4]}','46','${resultados[0].id}','${data[6]}','${data[11]}')`); 

          return  client       
      },
    )
    })
  };

const EEOPage11 = async data => {

  console.log("useractions eEOpage10" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[10]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve({message:"exito"})
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','47','${resultados[0].id}','${data[11]}','${data[12]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','48','${resultados[0].id}','${data[11]}','${data[13]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','49','${resultados[0].id}','${data[11]}','${data[14]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','50','${resultados[0].id}','${data[11]}','${data[15]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[4]}','51','${resultados[0].id}','${data[11]}','${data[16]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[5]}','52','${resultados[0].id}','${data[11]}','${data[17]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[6]}','53','${resultados[0].id}','${data[11]}','${data[18]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[7]}','54','${resultados[0].id}','${data[11]}','${data[19]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[8]}','55','${resultados[0].id}','${data[11]}','${data[20]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[9]}','56','${resultados[0].id}','${data[11]}','${data[21]}')`); 

          return  client       
      },
    )
    })
};

const EEOPage12 = async data => {

  console.log("useractions eEOpage12" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[8]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','57','${resultados[0].id}','${data[9]}','${data[10]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','58','${resultados[0].id}','${data[9]}','${data[11]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','59','${resultados[0].id}','${data[9]}','${data[12]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','60','${resultados[0].id}','${data[9]}','${data[13]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[4]}','61','${resultados[0].id}','${data[9]}','${data[14]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[5]}','62','${resultados[0].id}','${data[9]}','${data[15]}')`); 
    
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[6]}','63','${resultados[0].id}','${data[9]}','${data[16]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[7]}','64','${resultados[0].id}','${data[9]}','${data[17]}')`); 
          
          return  client       
      },
    )
    })
  };

const EEOPage13 = async data => {

  console.log("useractions eEOpage10" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[4]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','65','${resultados[0].id}','${data[5]}','${data[6]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','66','${resultados[0].id}','${data[5]}','${data[7]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','67','${resultados[0].id}','${data[5]}','${data[8]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','68','${resultados[0].id}','${data[5]}','${data[9]}')`); 
          
          return  client       
      },
    )
    })
};

const EEOPage14 = async data => {

  console.log("useractions eEOpage14" , data)
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[4]}'`,
      function (error, results, fields) {
      if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[0]}','69','${resultados[0].id}','${data[5]}','${data[6]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','70','${resultados[0].id}','${data[5]}','${data[7]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','71','${resultados[0].id}','${data[5]}','${data[8]}')`); 
          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','72','${resultados[0].id}','${data[5]}','${data[9]}')`); 
          client.query(`insert into periodos(fk_empleados,periodo,encuesta) values ('${resultados[0].id}','${data[5]}','EEO')`);

          return  client       
      },
    )
    })
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const AtsPoliticaPrivacidad = async data => {
return  new Promise((resolve, reject) => {
  client
  .query(`select * from  empleados where correo='${data[0]}'and atsContestado='false'`,
  function (error, results, fields) {
  if (error) reject(error) 
    if(results[0]){
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      console.log("los resultados son " , resultados)
      resolve(resultados[0]) 
      client
      .query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[1]}','11','${resultados[0].id}','${data[2]}')`); 
      return  client
    }else{
      resolve({message:"usuario incorrecto"})
    }

  },
)
})
};


const RPPoliticaPrivacidad = async data => {
  console.log("datauseraction" ,  data)

  return  new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[0]}' and rpContestado='false'`,
        function (error, results, fields) {
        if (error) reject(error) 
        if(results[0]){
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        console.log("los resultados son " , resultados[0])
        resolve(resultados[0])  
          client
          .query(`insert into respuestasRP(Respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[1]}','47','${resultados[0].id}','${data[2]}','${0}')`); 
          return  client
        }else{
          resolve({message:"usuario incorrecto"})
        }
      },
    )
    })
  };

const EEOPoliticaPrivacidad = async data => {
  return  new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[0]}' and eeoContestado='false'`,
        function (error, results, fields) {
        if (error) reject(error) 
        if(results[0]){
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados[0]) 
          client
          .query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[1]}','73','${resultados[0].id}','${data[2]}','${0}')`); 
          return  client
        }else{
          resolve({message:"usuario incorrecto"})
        }
      },
    )
    })
  };



const  SendMail = async (args) => {
  
  console.log("el correo es " , args)
  var LaFecha=new Date();
  var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasem=new Array('domingo','lunes','martes','miercoles','jueves','viernes','sabado');
  var diasemana=LaFecha.getDay();
  var FechaCompleta="";
  var NumeroDeMes="";
  var hora = LaFecha.getHours() 
  var minuto = LaFecha.getMinutes() 
  var segundo = LaFecha.getSeconds() 
  
  NumeroDeMes=LaFecha.getMonth();
  FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear()+" "+hora+":"+minuto+":"+segundo;
  


var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
          user: 'adsdiagnostico035@gmail.com',
          pass: 'ads*473alfa',
          host: 'smtp.gmail.com',
          port: 465,
      }
  });
  var encuesta =""
console.log("estos son los args", args[2] )
if(args[2]==1){

  encuesta="ATS"

}if(args[2]==2){

  encuesta="RP"
}
if(args[2]==3){

  encuesta="EEO"
}
  const mailOptions = {
  from: 'adsdiagnostico035@gmail.com', // sender address
  to: `${args[0]}`, // list of receivers
  subject: 'Iniciar Evaluación', // Subject line
  html: `<p>Estimado Colaborador por medio de este enlace le envío su encuesta ${encuesta}, en el panel por favor seleccione la opción que le corresponda  e ingrese su correo electrónico para iniciar su evaluación <br/> ATENTAMENTE la Adminstración </p> https://master.d14ylpne1awxxr.amplifyapp.com/` // plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
  if("este es el error" , err)
    console.log(err)
  else
    console.log("esta es la info" ,  info);
});




return  new Promise((resolve, reject) => {
client
.query(`insert into correos(Encuesta,fecha,fk_empleados,contestado) values ('${encuesta}','${FechaCompleta}','${args[1]}','false')`); 
return  client

})
}

const getUsers = async data => {

  console.log("datauseraction getusers" , `select * from empleados inner join administrador on empleados.fk_administrador = administrador.id where empleados.fk_administrador = '${data.data[0]}' and empleados.EmpleadoActivo ='true'`)

  return  new Promise((resolve, reject) => {
      client
      .query(`select empleados.id,empleados.nombre, empleados.ApellidoP, empleados.ApellidoM,empleados.Curp,empleados.RFC,empleados.FechaNacimiento,empleados.Sexo , empleados.CP,empleados.EstadoCivil,empleados.CentroTrabajo,empleados.correo, empleados.AreaTrabajo,empleados.Puesto,empleados.Ciudad,empleados.NivelEstudios,empleados.TipoPersonal,empleados.JornadaTrabajo,empleados.TipoContratacion,empleados.TiempoPuesto,empleados.ExperienciaLaboral,empleados.RotacionTurnos,empleados.fk_Administrador,empleados.ATSContestado,empleados.RPContestado,empleados.EEOContestado,empleados.ATSDetectado,empleados.EmpleadoActivo from empleados inner join administrador on empleados.fk_administrador = administrador.id where empleados.fk_administrador = '${data.data[0]}' and empleados.EmpleadoActivo ='true'`,
        function (error, results, fields) {
        if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados) 
       console.log("resultados getusers",resultados)
      },
    )
    })
};
const ResultSingleSurvey = async data => {
console.log("query",`select * from respuestasats inner join empleados on respuestasats.fk_empleados = empleados.id where respuestasats.fk_empleados = '${data[0]}' and respuestasats.periodo = '${data[1]}' `)
  return  new Promise((resolve, reject) => {
      client
      .query(`select * from respuestasats inner join empleados on respuestasats.fk_empleados = empleados.id where respuestasats.fk_empleados = '${data[0]}' and respuestasats.periodo = '${data[1]}' `,
        function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        console.log("los resultados single survey  son ",resultados )
        resolve(resultados
        ) 
      
      },
    )
    })
  };


const ResultSingleSurveyRP = async data => {
    return  new Promise((resolve, reject) => {
      console.log("query ",`select * from respuestasrp inner join empleados on respuestasrp.fk_empleadosrp = empleados.id where respuestasrp.fk_empleadosrp ='${data[0]}' and respuestasrp.periodo ='${data[1]}' `)
        client
        .query(`select * from respuestasrp inner join empleados on respuestasrp.fk_empleadosrp = empleados.id where respuestasrp.fk_empleadosrp ='${data[0]}' and respuestasrp.periodo ='${data[1]}' `,
          function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string); 
          console.log("los resultados single surveyats  son ",resultados )
          resolve(resultados
          ) 
        },
      )
      })
    };

const ResultSingleSurveyEEO = async data => {
  return  new Promise((resolve, reject) => {
  console.log("el id del empleado es " , data[0])
      client
      .query(`select * from respuestaseeo inner join empleados on respuestaseeo.fk_empleados = empleados.id where respuestaseeo.fk_empleados = '${data[0]}' and respuestaseeo.periodo ='${data[1]}' `,
        function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        console.log("los resultados single survey  son ",resultados )
        resolve(resultados
        ) 
      },
    )
    })
  };


const GetAdmin = async data => {

  console.log("datauseraction" ,  data)

  return  new Promise((resolve, reject) => {
    client
    .query(`select empleados.id from empleados inner join administrador on empleados.fk_administrador = administrador.id where administrador.correo ='${data[0]}' `,
      function (error, results, fields) {
      if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      console.log("los resultados son  " , resultados)
      resolve(resultados) 
    },
  )
  })
  };

const AuthRegisterSingleEmployee = async data => {
return new Promise((resolve, reject) => {
  console.log("la sdata"  ,`select * from  administrador where correo='${data[0]}'`)
  client.query(`select * from  administrador where correo='${data[0]}'`,
  function (error, results, fields) {
    var string=JSON.stringify(results);
    var resultados =  JSON.parse(string); 
    // console.log("los resultados de la primera consulta son " , resultados)
      client.query(`select count(id) as max from empleados where empleados.fk_administrador = ' ${resultados[0].id}'`,  function (error, valores, fields) {
      var val=JSON.stringify(valores);
      var valor =  JSON.parse(val); 
      // console.log("los resultados de la segunda consulta son " , valor)
      resolve(valor) 
      return  client
    }) 
    
  },
)
})
};

const InactiveAdmin = async data => {
  return  new Promise((resolve, reject) => {
    resolve({message:"Usuario Blqueado"})
    client
    .query(`update superusuario set Activo='false' where id  ='${data[0]}'` );
    })
  };

const VerifiEmailSurveyATS = async data => { 
  console.log("la data en useractions es " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  ATSContestado  from  empleados where id='${data[0]}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      console.log("los resultados son ", resultados)
      resolve(resultados)
      return client
    },
  )
  })
  };
const VerifiEmailSurveyRP = async data => { 
  console.log("la data en useractions es " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  RPContestado  from  empleados where id='${data[0]}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      console.log("los resultados son ", resultados)
      resolve(resultados)
      return client
    },
  )
  })
  };

const VerifiEmailSurveyEEO = async data => { 
  console.log("la data en useractions es " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  EEOContestado  from  empleados where id='${data[0]}'`,
  function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      console.log("los resultados son ", resultados)
      resolve(resultados)
      return client
    },
  )
  })
  };


const RegisterSucursales = async data => { 
  console.log("la data en useractions es " , data[11])
  return  new Promise((resolve, reject) => {
    client
    .query(`select * from  administrador where correo='${data[11]}' `,
    function (error, results, fields) {
    if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      resolve(resultados) 
      client
      .query(`insert into sucursales(nombreSucursal,calle,numExt,numInt,colonia,CP,Ciudad,Estado,actividad,telefono,actividades,fk_administrador,SucursalActiva) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}','${data[10]}','${resultados[0].id}','true')`); 
      return  client
    },
  )
  })
  };

const GetSucursales = async data => { 
  
  console.log("la data en useractions getsucursales es " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      
      console.log("el administrador es " , resultados[0].id)
      client.query(`select  * from sucursales where fk_administrador ='${resultados[0].id}' and SucursalActiva='true'`,
      function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string);   
          console.log("los resultados son ", resultados)
          resolve(resultados)
          return client
        },
      )
    },
  )
  })
  };

const RegisterApartments = async data => { 
  console.log("la data en useractions REGISTER aPARTMENT es " , data[1])
  return  new Promise((resolve, reject) => {
    client
    .query(`select * from  administrador where correo='${data[1]}' `,
    function (error, results, fields) {
    if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      resolve(resultados) 
      client
      .query(`insert into departamentos(nombre,fk_Administrador,DepartamentoActivo) values ('${data[0]}','${resultados[0].id}', 'true')`); 
      return  client
    },
  )
  })
  };

const GetDeptos = async data => { 
  console.log("la data en useractions getdeptos es " ,`select  *  from  administrador where correo='${data}'`)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`select  * from departamentos where fk_administrador ='${resultados[0].id}' and DepartamentoActivo='true'`,
      function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string);   
          resolve(resultados)
          return client
        },
      )
    },
  )
  })
  };
const RegisterPuesto = async data => { 
  return  new Promise((resolve, reject) => {
    client
    .query(`select * from  administrador where correo='${data[1]}' `,
    function (error, results, fields) {
    if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      resolve(resultados) 
      client
      .query(`insert into puestos(nombre,fk_Administrador,PuestoActivo) values ('${data[0]}','${resultados[0].id}','true')`); 
      return  client
    },
  )
  })
  };

const GetPuestos = async data => { 
  console.log("la data en useractions getpuestos es " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`select  * from puestos where fk_administrador ='${resultados[0].id}' and PuestoActivo='true'`,
      function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string);   
          resolve(resultados)
          return client
        },
      )
    },
  )
  })
  };
const DeleteEmployees = async data => { 
console.log("la data en delete es " , data)
return new Promise((resolve, reject) => {
  client.query(`select  *  from  administrador where correo='${data[1]}'`,
  function (error, results, fields) {
    var string=JSON.stringify(results);
    var resultados =  JSON.parse(string);   
    client.query(`update empleados set EmpleadoActivo="false"  where id =${data[0]} and fk_administrador='${resultados[0].id}'`,
    function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string);   
        resolve(resultados)
        return client
      },
    )
  },
)
})
};

const DeleteSucursales = async data => { 
  console.log("la data en deleteSucursales es " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data[1]}'`,
  function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`update sucursales set SucursalActiva="false"  where id =${data[0]} and fk_administrador='${resultados[0].id}'`,
      function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string);   
        resolve(resultados)
        return client
      },
    )
    },
  )
  })
};
const DeleteDeptos = async data => { 
  console.log("la data en deleteSucursales es " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data[1]}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`update departamentos set DepartamentoActivo="false"  where id =${data[0]} and fk_administrador='${resultados[0].id}'`,
      function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string);   
          resolve(resultados)
          return client
        },
      )
    },
  )
  })
  };

const DeletePuestos = async data => { 
  console.log("la data en deleteSucursales es " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data[1]}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`update puestos set PuestoActivo="false"  where id =${data[0]} and fk_administrador='${resultados[0].id}'`,
      function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string);   
          resolve(resultados)
          return client
        },
      )
    },
  )
  })
  };

const UpdateEmployees = async data => { 
  console.log("la data en updateEmployees es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data[12]}'`,
  function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`update empleados set nombre='${data[0]}',ApellidoP ='${data[1]}',ApellidoM='${data[2]}',Curp='${data[3]}',RFC='${data[4]}', Sexo ='${data[5]}',CentroTrabajo='${data[6]}',correo='${data[7]}',AreaTrabajo='${data[8]}',Puesto='${data[9]}',Ciudad= '${data[10]}'  where id ='${data[11]}' and fk_administrador='${resultados[0].id}'`)
    resolve(client) 
    return client
    },
  )
  })
  };
const UpdateSucursales = async data => { 
  console.log("la data en updatesucursales es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data[10]}'`,
  function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`update sucursales set nombreSucursal='${data[0]}',calle ='${data[1]}',numExt='${data[2]}',numInt='${data[3]}',colonia='${data[4]}', CP ='${data[5]}',ciudad='${data[6]}',telefono='${data[7]}',actividades='${data[9]}' where id ='${data[8]}' and fk_administrador='${resultados[0].id}'`)
    resolve(client) 
    return client
    },
  )
  })
  };

const UpdateDeptos = async data => { 
  console.log("la data en updateDeptos es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data[2]}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`update departamentos set nombre='${data[0]}' where id ='${data[1]}' and fk_administrador='${resultados[0].id}'`)
      resolve(client) 
      return client
    },
  )
  })
};    

const UpdatePuestos = async data => { 
  console.log("la data en updatePuestos es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data[2]}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`update puestos set nombre='${data[0]}' where id ='${data[1]}' and fk_administrador='${resultados[0].id}'`)
      resolve(client) 
      return client
    },
  )
  })
  };    
const GetPonderacion = async data => { 
  // console.log("la data en getPonderacion es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  ponderacionrp`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
    //  console.log("resultados" , resultados) 
      return client
    },
  )
  })
  };      

const GetPonderacionEEO = async data => { 
  console.log("la data en getPonderacion es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  ponderacionEEO`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
      console.log("resultados" , resultados) 
      return client
    },
  )
  })
  };
                                                                  
const GetEmployeesResolvesSurveyATS = async data => { 
  // console.log("la data en getPonderacion es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.ATSContestado from empleados where fk_Administrador='${data[0]}' and ATSContestado='true' and EmpleadoActivo='true'`,
  function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
    resolve(resultados)
    // console.log("resultados" , resultados) 
    return client
    },)
  })
  };
const GetEmployeesResolvesSurveyRP = async data => { 
  // console.log("la data en getPonderacion es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.RPContestado from empleados where fk_Administrador='${data[0]}' and RPContestado='true' and EmpleadoActivo='true'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
      // console.log("resultados" , resultados) 
      return client
    },
  )
  })
  };
const GetEmployeesResolvesSurveyEEO = async data => { 
  // console.log("la data en getPonderacion es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.EEOContestado from empleados where fk_Administrador='${data[0]}' and EEOContestado='true' and EmpleadoActivo='true'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
      // console.log("resultados" , resultados) 
      return client
    },
  )
  })
  };                  
                              
const GetEmployeesResolvesSurveyATSFalse = async data => { 
  // console.log("entro a false")
    // console.log("la data en getPonderacionFalse es  " , data)
    return new Promise((resolve, reject) => {
      client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.ATSContestado from empleados where fk_Administrador='${data[0]}' and ATSContestado='false' and EmpleadoActivo='true'`,
    function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string);   
        resolve(resultados)
        // console.log("resultados" , resultados) 
        return client
      },)
  })
  };
const GetEmployeesResolvesSurveyRPFalse = async data => { 
  // console.log("la data en getPonderacion es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.RPContestado from empleados where fk_Administrador='${data[0]}' and RPContestado='false' and EmpleadoActivo='true'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
      // console.log("resultados" , resultados) 
      return client
    },
  )
  })
  };        

const GetEmployeesResolvesSurveyEEOFalse = async data => { 
  // console.log("la data en getPonderacion es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.EEOContestado from empleados where fk_Administrador='${data[0]}' and EEOContestado='false' and EmpleadoActivo='true'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
    //  console.log("resultados" , resultados) 
      return client
    },
  )
  })
  };    
const CountEmployees = async data => { 
  // console.log("la data en getPonderacion es  " , data)
  return new Promise((resolve, reject) => {
    client.query(`select count(id) as id from empleados where fk_administrador='${data[0]}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
    //  console.log("resultados" , resultados) 
      return client
    },
  )
  })
};

const GetEmployeesATSDetectado = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select * from empleados where fk_administrador='${data[0]}' and ATSDetectado='true'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
    //  console.log("resultados" , resultados) 
      return client
    },
  )
  })
  };    

const GetEmployeesResolvesRP = async data => { 

  return new Promise((resolve, reject) => {
    client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id where empleados.fk_Administrador='${data[0]}'  and empleados.EmpleadoActivo='true' and periodos.encuesta='RP'`,                                                                                   
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
    //  console.log("resultados" , resultados) 
      return client
    },
  )
  })
  };    

  const GetEmployeesResolvesATS = async data => { 

    return new Promise((resolve, reject) => {
      console.log("data" ,data)
        if(data[0]){
          client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id where empleados.fk_Administrador='${data[0]}'  and empleados.EmpleadoActivo='true' and periodos.encuesta='ATS'`,                                                                                   
          function (error, results, fields) {
            if(error) {
              console.log("error" , error)
            }
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string);   
            resolve(resultados)
          //  console.log("resultados" , resultados) 
            return client
          },
        )
        }
    })
    };
                                                                                  
const GetresultGlobalSurveyRP = async data => {

  console.log("data[0]",data[0],"data[1]",data[1])
  console.log("la data es ",`select * from empleados inner join respuestasrp on respuestasRP.fk_empleadosRP = empleados.id where empleados.id =' ${data[0]}'  and respuestasRP.periodo='${data[1]}'`)
  return  new Promise((resolve, reject) => {
      client.query(`select * from empleados inner join respuestasrp on respuestasRP.fk_empleadosRP = empleados.id where empleados.id =' ${data[0]}'  and respuestasRP.periodo='${data[1]}'`,
        function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string);
        resolve(resultados
        ) 
      },
    )
    })
  }; 
  
const GetEmployeesResolvesEEO = async data => { 
  
  return new Promise((resolve, reject) => {
    client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id where empleados.fk_Administrador='${data[0]}'  and empleados.EmpleadoActivo='true' and periodos.encuesta='EEO'`,                                                                                   function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
     console.log("resultados" , JSON.stringify(data)) 
      return client
    },
  )
  })
  };    
const GetresultGlobalSurveyEEO = async data => {
  console.log("la data es ",data[0])
  return  new Promise((resolve, reject) => {
      client.query(`select * from empleados inner join respuestaseeo on respuestaseeo.fk_empleados = empleados.id where empleados.id =' ${data[0]}'  and respuestaseeo.periodo='${data[1]}'`,
        function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string);
        console.log(`select * from empleados inner join respuestaseeo on respuestaseeo.fk_empleados = empleados.id where empleados.id =' ${data[0]}'  and respuestaseeo.periodo='${data[1]}'`)
        resolve(resultados
        ) 
      },
    )
    })
  }; 
  
  const EmployeeActive = async data => {
    console.log("la data es ",data)
    return  new Promise((resolve, reject) => {
        client.query(`select * from empleados where fk_administrador = '${data[0]}' and empleadoActivo='true' limit 1`,
          function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string);
          console.log("los resuktadis son", resultados)
          resolve(resultados
          ) 
        },
      )
      })
    }; 
    const DeptoActive = async data => {
      console.log("la data es ",data)
      return  new Promise((resolve, reject) => {
          client.query(`select * from departamentos where fk_administrador = '${data[0]}' and DepartamentoActivo='true' limit 1`,
            function (error, results, fields) {
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string);
            console.log("los resu son", resultados)
            resolve(resultados
            ) 
          },
        )
        })
      }; 
      const SucActive = async data => {
        console.log("la data es ",data)
        return  new Promise((resolve, reject) => {
            client.query(`select * from sucursales where fk_administrador = '${data[0]}' and SucursalActiva='true' limit 1`,
              function (error, results, fields) {
              var string=JSON.stringify(results);
              var resultados =  JSON.parse(string);
              console.log("los resu son", resultados)
              resolve(resultados
              ) 
            },
          )
          })
        }; 
        const PuestoActive = async data => {
          console.log("la data es ",data)
          return  new Promise((resolve, reject) => {
              client.query(`select * from puestos where fk_administrador = '${data[0]}' and PuestoActivo='true' limit 1`,
                function (error, results, fields) {
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);
                console.log("los resu son", resultados)
                resolve(resultados
                ) 
              },
            )
            })
          }; 
        const AddPeriodo = async data => {
         console.log("data periodo" , data[1]) 
          return  new Promise((resolve, reject) => {
                client.query(`select * from eventos where Descripcion = '${data[0]}' and fk_administrador ='${data[6]}'`,
                function (error, results, fields) {
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);
                if(resultados[0]){
                  resolve({message:"periodo existente"}) 
                }else{
                client.query(`insert into eventos(fk_administrador,evento,eventoFinal,Alerta1,Alerta2,Alerta3,Descripcion,EventoActivo,Alerta1Enviada,Alerta2Enviada,Alerta3Enviada) values ('${data[6]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[0]}','true','false','false','false')`,
                          resolve({message:"registro exitoso"})
                  )
                }
                
              },
            )           
            })
          }; 
          
        const GetPeriodo = async data => {
          console.log(`select * from eventos where fk_administrador = '${data[0]}' and EventoActivo='true'`)
          return  new Promise((resolve, reject) => {
              client.query(`select * from eventos where fk_administrador = '${data[0]}' and EventoActivo='true'`,
                function (error, results, fields) {
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);
                console.log("los resu son", resultados)
                resolve(resultados
                ) 
              },
            )
            })
          };   

        const DeletePeriodo = async data => {
          console.log("la data es ",data)
          return  new Promise((resolve, reject) => {
              client.query(`update eventos set eventoActivo='false' where fk_Administrador='${data[1]}' and Descripcion='${data[0]}' `,
              client.query(`update empleados set ATSContestado='false',RPContestado='false',EEOContestado='false' where fk_Administrador='${data[1]}'`),
             
              resolve({message:"evento Actualizado"})
            )
            })
          };   
  
    
        const GetPeriodoDesabilited = async data => {
          console.log("la data es ",data)
          return  new Promise((resolve, reject) => {
              client.query(`select * from eventos where fk_administrador = '${data[0]}' and EventoActivo='false'`,
                function (error, results, fields) {
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);
                console.log("los resu son", resultados)
                resolve(resultados
                ) 
              },
            )
            })
          };  

          // const UpdatePeriodo = async data => {
          //   console.log("la data es ",data)
          //   return  new Promise((resolve, reject) => {
          //       client.query(`update eventos set eventoActivo='true' where fk_Administrador='${data[1]}' and evento='${data[0]}' `,
          //       resolve({message:"evento Actualizado"})
          //     )
          //     })
          //   };   

            const GetEventos = async data => {

              return  new Promise((resolve, reject) => {
                client
                .query(`select * from  eventos where fk_administrador='${data[0]}' and EventoActivo='true'`,
                  function (error, results, fields) {
                  if (error) reject(error) 
                  var string=JSON.stringify(results);
                  var resultados =  JSON.parse(string); 
                  console.log("get eventos" , resultados)
                  if(resultados[0]){
                    
                  resolve({message:"evento encontrado",eventoFinal:resultados[0].eventoFinal,alerta1:resultados[0].alerta1,alerta2:resultados[0].alerta2,alerta3:resultados[0].alerta3})    
                  }else{
                    resolve({message:"exito"})
                  }
                },
              )
              })
              }; 

              
          const GetEmployeesFkAdmin = async data => {

            return  new Promise((resolve, reject) => {
              client
              .query(`select * from empleados where correo='${data[0]}'`,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);           
                resolve(resultados)  
                  
             
              },
            )
            })
            }; 
          const AddPeriodoInicial = async data => {

            return  new Promise((resolve, reject) => {
              client
              .query(`select MAX(id) as id from administrador`,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
              var resultados = JSON.parse(string)
                 client.query(`insert into eventos (fk_administrador,evento,eventoFinal,alerta1,alerta2,alerta3,Descripcion,EventoActivo,Alerta1Enviada,Alerta2Enviada,Alerta3Enviada) values ('${resultados[0].id}','${data[0]}','no hay Eventos','no hay Eventos','no hay Eventos','no hay Eventos','Periodo Inicial','true','false','false','false')`,     
                resolve(client)  
                  
                 )
              },
            )
            })
            }; 
          const GetUsersTableEmployeesthisPeriodo = async data => {
            console.log("la data es " , data)
            return  new Promise((resolve, reject) => {
              client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id  where empleados.fk_administrador='${data[0]}' and empleados.EmpleadoActivo='true'and periodos.periodo='${data[1]}' and periodos.encuesta='RP'`,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string); 
                resolve(resultados) 
                // console.log("resultados getusers",resultados)
              },
            )
            })
            }; 
          const GetUsersTableEmployeesthisPeriodoEEO = async data => {
            console.log("la data es " , data)
            return  new Promise((resolve, reject) => {
              client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id  where empleados.fk_administrador='${data[0]}' and empleados.EmpleadoActivo='true'and periodos.periodo='${data[1]}' and periodos.encuesta='EEO'`,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string); 
                resolve(resultados) 
                // console.log("resultados getusers",resultados)
              },
            )
            })
            }; 
        const GetAdminFechaRegistro = async data => {
          return  new Promise((resolve, reject) => {
            client.query(`select * from superusuario where  id = '${data[0]}'`,
              function (error, results, fields) {
              if (error) reject(error) 
              var string=JSON.stringify(results);
              var resultados =  JSON.parse(string); 
              resolve(resultados[0]) 
                console.log("resultados getusers",resultados)
            },
          )
          })
          }; 
        const GetUsersTableEmployeesthisPeriodoATS = async data => {
          console.log("la data que revcibo es es " , data)
          console.log("la consulta",`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id  where empleados.fk_administrador='${data[0]}' and empleados.EmpleadoActivo='true'and periodos.periodo='${data[1]}' and periodos.encuesta='ATS'`)
          return  new Promise((resolve, reject) => {
            client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id  where empleados.fk_administrador='${data[0]}' and empleados.EmpleadoActivo='true'and periodos.periodo='${data[1]}' and periodos.encuesta='ATS'`,
              function (error, results, fields) {
              if (error) reject(error) 
              var string=JSON.stringify(results);
              var resultados =  JSON.parse(string); 
              resolve(resultados) 
              console.log("resultados getusers",resultados)
            },
          )
          })
          }; 
        const AddAdminEmpresa = async data => {
          console.log("data" ,data)
          let auth1;
          let auth2;
          return  new Promise((resolve, reject) => {
            client.query(`select * from administrador where rfc= '${data[2]}' or correo = '${data[4]}'`,
              function (error, results, fields) {
              if (error) reject(error) 
              var string=JSON.stringify(results);
              var resultados =  JSON.parse(string); 
              if(resultados[0]){
                resolve({message:"rfc o correo duplicados"})
              }
              else{
                bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                  if (err) {
                    reject(err,{message: 'Error',token: err}) 
                  } else {
                    bcrypt.hash(data[5], salt, function(err, hash) {
                      if (err) {
                        throw err
                      } else {
                        // console.log(hash)
                        resolve({message:"admin Registrado",toke:hash})
                        client.query(`insert into administrador (nombre, apellidos , RFC , RazonSocial ,correo,contraseña,Activo,FechaRegistro,fk_superusuario,objetivo) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${hash}','true','${data[6]}','${data[7]}','${data[8]}')`)
                        return client
                      }
                    })
                  }
                })
              }

              
              // console.log("resultados getusers",resultados)
            },
          )

          })
          }; 
  
        const GetEmpresas = async data => {
         
          return  new Promise((resolve, reject) => {
            client.query(`select * from administrador where fk_superusuario ='${data[0]}'`,
              function (error, results, fields) {
              if (error) reject(error) 
              var string=JSON.stringify(results);
              var resultados =  JSON.parse(string); 
              resolve(resultados) 
              // console.log("resultados getusers",resultados)
            },
          )
          })
          }; 
          const GetAdminDashboard = async data => {
         
            return  new Promise((resolve, reject) => {        
              client.query(`select * from administrador where id='${data[0]}'`,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);
                console.log("los resultados" , resultados[0])
                
                resolve(resultados[0]) 
                // console.log("resultados getusers",resultados)
              },
            )
            })
            }; 
          const InsertPack = async data => {
            client.query(`insert into superusuario (fk_paquetes) values('${data[0]}')`)
            return  new Promise((resolve, reject) => {
              client.query(`select Max(id) as  id from superusuario`,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);                
                resolve(resultados[0]) 
                // console.log("resultados getusers",resultados)
              },
            )
            })

            }; 
        const VerifyPackSuperUser = async data => {
          
          return  new Promise((resolve, reject) => {
            client.query(`select * from paquetes inner join superusuario on superusuario.fk_paquetes = paquetes.id  where superusuario.id='${data[0]}'`,
              function (error, results, fields) {
              if (error) reject(error) 
              var string=JSON.stringify(results);
              var resultados =  JSON.parse(string);    
              console.log("los datos emoresas empleados son" , resultados)            
              resolve(resultados[0]) 
              // console.log("resultados getusers",resultados)
            },
          )
          })
          }; 
          const CountEmpresas = async data => {
            return  new Promise((resolve, reject) => {
              client.query(`select count(id) as id from administrador where fk_superUsuario = ' ${data[0]}'`,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);                
                resolve(resultados[0]) 
                // console.log("resultados getusers",resultados)
              },
            )
            })
            }; 
          const EditDataAdmin = async data => {
            console.log("la data para editar es " , data[0])
            return  new Promise((resolve, reject) => {
              bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err) {
                  reject(err,{message: 'Error',token: err}) 
                } else {
                  bcrypt.hash(data[3], salt, function(err, hash) {
                    if (err) {
                      throw err
                    } else {
                      // console.log(hash)
                      resolve({ message: 'Actualización exitosa'})
                      client.query(`update administrador set nombre='${data[0]}',Apellidos='${data[1]}',correo='${data[2]}',contraseña='${hash}' where id='${data[4]}' `)    
                    return client
                    }
                  })
                }
              })
            })
            }; 
          const GetAdminAlfa = async data => {
            return  new Promise((resolve, reject) => {
              client.query(`select * from ventasAdminAlfa inner join adminAlfa on ventasAdminAlfa.fk_adminAlfa=adminAlfa.id inner join paquetes on ventasAdminAlfa.fk_paquetes = paquetes.id where ventasAdminAlfa.fk_adminAlfa = '${data[0]}' `,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);                
                resolve(resultados) 
                  console.log("resultados GetAdminAlfa",resultados)
              },
            )
            })
            }; 
          const Alert1 = async data => {
            console.log(data)
            return  new Promise((resolve, reject) => {
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                  user: 'adsdiagnostico035@gmail.com',
                  pass: 'ads*473alfa',
                  host: 'smtp.gmail.com',
                  port: 465,
                    }
                });
                const mailOptions = {
                from: 'adsdiagnostico035@gmail.com', // sender address
                to: `${data[0]}`, // list of receivers
                subject: 'Primera Alerta', // Subject line
                html: `${data[2]}` // plain text body
              };
              
              transporter.sendMail(mailOptions, function (err, info) {
                if("este es el error" , err){
                  console.log(err)
                }
                  
                else{
                  client.query(`update eventos set Alerta1Enviada='true' where idEventos = '${data[3]}'`)
                  resolve({message:"envio exitoso"})
                }
                  
              });
            })
            }; 
      const Alert2 = async data => {
        console.log(data)
        return  new Promise((resolve, reject) => {
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
              user: 'adsdiagnostico035@gmail.com',
              pass: 'ads*473alfa',
              host: 'smtp.gmail.com',
              port: 465,
                }
            });
            const mailOptions = {
            from: 'adsdiagnostico035@gmail.com', // sender address
            to: `${data[0]}`, // list of receivers
            subject: 'Segunda Alerta', // Subject line
            html: `${data[2]}` // plain text body
          };
          
          transporter.sendMail(mailOptions, function (err, info) {
            if("este es el error" , err){
              console.log(err)
            }
              
            else{
              client.query(`update eventos set Alerta2Enviada='true' where idEventos = '${data[3]}'`)
              resolve({message:"envio exitoso"})
            }
              
          });
        })
        }; 
        const Alert3 = async data => {
          console.log(data)
          return  new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              secure: true,
              auth: {
                user: 'adsdiagnostico035@gmail.com',
                pass: 'ads*473alfa',
                host: 'smtp.gmail.com',
                port: 465,
                  }
              });
              const mailOptions = {
              from: 'adsdiagnostico035@gmail.com', // sender address
              to: `${data[0]}`, // list of receivers
              subject: 'Tercera Alerta', // Subject line
              html: `${data[2]}` // plain text body
            };
            
            transporter.sendMail(mailOptions, function (err, info) {
              if("este es el error" , err){
                console.log(err)
              }
                
              else{
                client.query(`update eventos set Alerta3Enviada='true' where idEventos = '${data[3]}'`)
                resolve({message:"envio exitoso"})
              }
                
            });
          })
          }; 
        const UpdatePeriodo = async data => {
          console.log("data" , data)
          return  new Promise((resolve, reject) => {
            client.query(`select * from eventos where fk_administrador = '${data[5]}' and Descripcion = '${data[0]}'`,
            function (error, results, fields) {
            if (error) reject(error) 
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string);       
            if(resultados[0]){
              resolve({message:"evento existente"})
          }else{
            client.query(`select * from eventos where fk_administrador = '${data[5]}' and EventoActivo = 'true'`,
            function (error, results, fields) {
            if (error) reject(error) 
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string);       
            if(resultados[0]){
            client.query(`update eventos set eventoFinal='${data[1]}', alerta1 = '${data[2]}' , alerta2='${data[3]}', alerta3='${data[4]}' , Descripcion ='${data[0]}' where fk_administrador = '${data[5]}' and eventoActivo ='true'`)
              resolve({message:"evento Actualizdo"})
          }else{
             resolve({message:"no hay eventos"})
            }   
             
          },
        )
            }   
             
          },
        )

          })
          }; 

          const LoadLogo = async data => {
            return  new Promise((resolve, reject) => {
              client.query(`select * from logos`,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);                
                resolve({IMAGE:resultados[0].IMAGE}) 
                 
              },
            )
            })
            }; 

            const getImage = async data => {
              return  new Promise((resolve, reject) => {
                client.query(`select image from logos`,
                  function (error, results, fields) {
                  if (error) reject(error) 
                  var string=JSON.stringify(results);
                  var resultados =  JSON.parse(string);                
                  resolve({image:resultados[0].image}) 
                  console.log("load image",resultados[0].image)
                },
              )
              })
              }; 

          const GetallPeriodo = async data => {
            return  new Promise((resolve, reject) => {
                client.query(`select * from eventos where fk_administrador = '${data[0]}'`,
                  function (error, results, fields) {
                  var string=JSON.stringify(results);
                  var resultados =  JSON.parse(string);
                  console.log("los resu son", resultados)
                  resolve(resultados
                  ) 
                },
              )
              })
            };   
            
        const GetCorreos = async data => {
          return  new Promise((resolve, reject) => {
            console.log("correos")
              client.query(`select * from correos left join empleados on correos.fk_empleados = empleados.id inner join administrador on empleados.fk_administrador = administrador.id where administrador.id = '${data[0]}'`,
                function (error, results, fields) {
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);
                console.log("los resu son", resultados)
                resolve(resultados
                ) 
              },
            )
            })
          };   

        const GetresultGlobalSurveyATS = async data => {
          console.log("la data es ",`select * from empleados inner join respuestasats on respuestasats.fk_empleados= empleados.id where empleados.id =' ${data[0]}'  and respuestasats.periodo='${data[1]}'`)
          return  new Promise((resolve, reject) => {
              client.query(`select * from empleados inner join respuestasats on respuestasats.fk_empleados= empleados.id where empleados.id =' ${data[0]}'  and respuestasats.periodo='${data[1]}'`,
                function (error, results, fields) {
                  if(error) {
                    console.log("error" ,error)
                  }
                if(results) { 
                  var string=JSON.stringify(results);
                  var resultados =  JSON.parse(string);
                  resolve(resultados
                  ) 
                }  
             
              },
            )
            })
          }; 
            
            
      module.exports = {
        GetEmployeesResolvesATS,
        GetresultGlobalSurveyATS,
        GetCorreos,
        GetallPeriodo,
        getImage,
        LoadLogo,
        UpdatePeriodo,
        Alert2,
        Alert3,
        Alert1,
        GetAdminAlfa,
        LoginAdminAlfa,
        SignupAdminAlfa,
        EditDataAdmin,
        LoginEmpresas,
        CountEmpresas,
        VerifyPackSuperUser,
        InsertPack,
        GetAdminDashboard,
        GetEmpresas,
        AddAdminEmpresa,
        GetUsersTableEmployeesthisPeriodoATS,
        GetAdminFechaRegistro,
        GetUsersTableEmployeesthisPeriodoEEO,
        GetUsersTableEmployeesthisPeriodo,
        GetEmployeesFkAdmin,
        AddPeriodoInicial,
        GetEventos,
        // UpdatePeriodo,
        GetPeriodoDesabilited,
        DeletePeriodo,
        GetPeriodo,
        AddPeriodo,
        PuestoActive,
        SucActive,
        DeptoActive,
        EmployeeActive,
        GetresultGlobalSurveyEEO,
        GetEmployeesResolvesEEO,
        GetresultGlobalSurveyRP,
        GetEmployeesResolvesRP,
        GetEmployeesATSDetectado,
        CountEmployees,
        GetEmployeesResolvesSurveyEEOFalse,
        GetEmployeesResolvesSurveyRPFalse,
        GetEmployeesResolvesSurveyATS,
        GetEmployeesResolvesSurveyATSFalse,
        GetEmployeesResolvesSurveyRP,
        GetEmployeesResolvesSurveyEEO,
        GetPonderacionEEO,
        GetPonderacion,
        UpdatePuestos,
        UpdateDeptos,
        UpdateSucursales,
        UpdateEmployees,
        DeletePuestos,
        DeleteDeptos,
        DeleteSucursales,
        DeleteEmployees,
        GetPuestos,
        RegisterPuesto,
        GetDeptos,
        RegisterApartments,
        GetSucursales,
        RegisterSucursales,
        VerifiEmailSurveyEEO,
        VerifiEmailSurveyRP,
        VerifiEmailSurveyATS,
        InactiveAdmin,
        AuthRegisterSingleEmployee,
        ResultSingleSurvey,
        signup,
        login,
        registerEm,
        registerRazonS,
        getUsers,
        AtsPage1,
        AtsPage2,
        AtsPage3,
        AtsPage4,

        RPPage1,
        RPPage2,
        RPPage3,
        RPPage4,
        RPPage5,
        RPPage6,
        RPPage7,
        RPPage8,
        
        RPValidadorPage7,
        RPValidadorPage8,
        EEOPage1,
        EEOPage2,
        EEOPage3,
        EEOPage4,
        EEOPage5,
        EEOPage6,
        EEOPage7,
        EEOPage8,
        EEOPage9,
        EEOPage10,
        EEOPage11,
        EEOPage12,
        EEOPage13,
        EEOPage14,
        AtsPoliticaPrivacidad,
        RPPoliticaPrivacidad,
        EEOPoliticaPrivacidad,

        SendMail,
        GetAdmin,
        ResultSingleSurveyRP,
        ResultSingleSurveyEEO
      }