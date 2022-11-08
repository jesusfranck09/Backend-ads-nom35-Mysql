
const client = require('../database/');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const { createToken } = require('../utils');
var nodemailer = require('nodemailer');

const signup =   (user) => {
  const utcDate2 = new Date()
  var fechaRegistro =  utcDate2.toGMTString()
  return new Promise((resolve, reject) => {
   
    if(user[5]){ 
    client
    .query(`select * from  superusuario where correo='${user[5]}'`,
    
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      if(resultados[0]){
        resolve({ message:'duplicado'})
      }else{
        client
        .query(`select * from  superusuario where rfc='${user[2]}'`,
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
                bcrypt.hash(user[6], salt, function(err, hash) {
                  if (err) {
                    throw err
                  } else {
                    client.query(`insert into superusuario (nombre,apellidos,RFC,RazonSocial,telefono,correo,contraseña,activo,fechaRegistro,fk_paquetes) values('${user[0]}','${user[1]}','${user[2]}','${user[3]}','${user[4]}','${user[5]}','${hash}','true','${fechaRegistro}','${user[9]}')`); 

                     client.query(`insert into ventasAdminAlfa (fk_adminAlfa,fk_paquetes,fechaVenta,RazonSocial,telefono,RFC) values('${user[7]}','${user[9]}','${user[8]}','${user[3].toUpperCase() }','${user[4] }','${user[2].toUpperCase() }')`)
                    resolve({ message: 'Signup exitoso',token:hash})
                    client.query(`select * from  paquetes where id='${user[9]}'`,
                    function (error, results, fields) {
                      var string=JSON.stringify(results);
                      var resultados =  JSON.parse(string); 
                      if(resultados[0]){
                        var transporter = nodemailer.createTransport({
                          secure: false,
                          host: 'mail.diagnostico035.com',
                          port: 587,
                          auth: {
                                  user: 'info@diagnostico035.com',
                                  pass: 'zAvb54$3',
                                 
                              },
                          tls: {rejectUnauthorized: false},
                          });
                          const mailOptions = {
                            from: 'info@diagnostico035.com', // sender address
                            to: `${user[5]},${user[10]},jesus.francisco@ads.com.mx,armando.franco@ads.com.mx`, // list of receivers
                            subject: 'Registro a Diagnóstico035 ', // Subject line
                            html: `<p>Empresa: ${user[3]}<br/>RFC: ${user[2]}<br/>Correo : ${user[5]}  Contraseña : ${user[6]} <br/> <br/> 
                              Hola  ${user[0]} ${user[1]} <br/> <br/> <br/> Acabas de unirte a Diagnóstico035. Con tu suscripción, disfrutarás de: <br/> <br/>
                            - Acceso ilimitado a la aplicación durante el periodo de tu suscripción. <br/> 
                            - Registro de   ${resultados[0].empresas} Empresas y ${resultados[0].empleados} Empleados. <br/> 
                            - Evaluaciones ilimitadas de ATS, RP´s y EEO. <br/>
                            - Actualizaciones sin costo. <br/>
                            - Soporte básico ilimitado, sobre el uso de la aplicación.
                              <br/> <br/> <br/> 
                              <strong> Configuración </strong><br/>
                              Para dar de alta tu empresa, deberás ingresar a la siguiente URL, con el usuario y contraseña  enviado por tu ejecutivo.<br/><br/>
                              https://madmin.diagnostico035.com/<br/><br/>
                              Una vez hecho esto deberás ingresar a la siguiente dirección y podrás comenzar a utilizar Diagnóstico035.<br/><br/>

                              https://admin.diagnostico035.com/<br/><br/>
                              <br/><br/>
                              También puedes encontrar una serie de videos que te ayudaran a entender más sobre diagnóstico035 en el siguiente enlace https://www.youtube.com/channel/UC2isBB9Kv5lJE5rZsfU5xPw
                              <br/><br/>
                              Conoce más sobre los beneficios de Diagnóstico035 en https://diagnostico035.com/
                              <br/><br/>
                              Gracias, <br/>
                              El equipo de Diagnóstico035.<br/><br/>

                              Tel: (55) 3603 9970 y (55) 5553 2049<br/>
                              Ext 101 y 102<br/>
                              www.diagnostico035.com<br/>
                            
                            
                            </p> ` // plain text body
                          };
                          
                          transporter.sendMail(mailOptions, function (err, info) {
                            if("este es el error" , err)
                              console.log(err)
                            else
                              console.log("esta es la info" ,  info);
                          });
                      }
                    },
                  )
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
  }
});
};


const SignupAdminAlfa =   (user) => {
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
                resolve({ message: 'Signup exitoso',token:hash})
               client
                .query(`insert into adminAlfa (nombreAdmin,apellidosAdmin,correo,contraseña) values  ('${user.first_name.toUpperCase() }','${user.last_name.toUpperCase() }','${user.email}','${hash}')`); 
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
  let correo = email
  return new Promise((resolve, reject) => {   
  if(!email || !password){
    resolve({message:"ningun dato",token:"no hay token"})
  }
  if(email && password){
    client
      .query(`select * from  superusuario where correo='${email}' `,
     function (error, results, fields) {
       if(error){
         console.log("error")
       }
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
          if(resultados[0]){
            bcrypt.compare(password,resultados[0].contraseña, function(err, result) {
            if(result){
              resolve({    
              message: 'Login exitoso',
               token: createToken( resultados[0].correo, resultados[0].contraseña),
               id:resultados[0].id,
               nombre:resultados[0].nombre,
               apellidos:resultados[0].apellidos,
               RFC:resultados[0].RFC,
               RazonSocial:resultados[0].RazonSocial,
               correo:resultados[0].correo,
               activo:resultados[0].activo
              });
              return result
            }else{
              resolve({correo:correo,message:"usuario y contraseña incorrectos",token:"no hay token"})
            }       
        })
      }else{
        resolve({correo:correo,message:"usuario y contraseña incorrectos",token:"no hay token"})
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
                 nombre:resultados[0].nombreAdmin, 
                 token: createToken( resultados[0].correo, resultados[0].contraseña),
                 id:resultados[0].id,
                 correo:resultados[0].correo
                });
                return result
              }else{
                resolve({message:"usuario y contraseña incorrectos",token:"no hay token"})
              }       
          })
        }else{
          resolve({message:"usuario y contraseña incorrectos",token:"no hay token"})
        }
        },
      )
      }  
    })
    }

    const  LoginEmpresas = async (data) => {
      console.log("data",data)
      let rfc = data[0]
      let password = data[1]
      let rfcData =  rfc
      return new Promise((resolve, reject) => {
        if(!rfc || !password){
          resolve({message:"ningun dato",token:"no hay token"})
      
        }
    
          if(rfc,password){
            client
            .query(`select * from  administrador where RFC='${rfc}'`,
              function (error, results, fields) {
                  var string=JSON.stringify(results);
                  var resultados =  JSON.parse(string); 
                    if(resultados[0]){
                    bcrypt.compare(password,resultados[0].contraseña, function(err, result) {
          
                      if(result){
                        console.log("resultados",result)

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
                          activo:resultados[0].Activo,
                          fechaRegistro:resultados[0].fechaRegistro,
                          fk_superusuario:resultados[0].fk_superusuario
                        });
                        return result
                      }else{

                    resolve({
                      RFC:rfcData,
                      message:"usuario y contraseña incorrectos",token:"no hay token"
                    })
                  }
                   
              })
            }else{
              resolve({  RFC:rfcData,message:"usuario y contraseña incorrectos",token:"no hay token"})
            }
              
             
            },
          )
          }
         
        })
        }

    const registerEm = (data) => {
      var correo = data[8].toUpperCase().replace(/ /g, "")
      return new Promise( (resolve, reject) => {
        client
        .query(`select * from  empleados where correo='${correo}'  and fk_administrador='${data[20]}'`,
        function (error, results, fields) {
          if(results[0]){
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string); 
            resolve({message:"correo existente",
            nombreExistente:data[0],
            apellidoPExistente:data[1],
            apellidoMExistente:data[2],
          })
          }else{
              client
            .query(`select * from sucursales where fk_administrador = '${data[20]}' and nombreSucursal='${data[19]}' `,
             function (error, results, fields) {
             if (error) reject(error) 
             var string=JSON.stringify(results);
             var resultados =  JSON.parse(string); 
             if(resultados[0]){
               client
              .query(`select * from departamentos where fk_administrador = '${data[20]}' and nombre='${data[9]}' `,
            
              function (error, results, fields) {
               if (error) reject(error) 
               var strings=JSON.stringify(results);
                var result=  JSON.parse(strings); 
               if(result[0]){
                 client
                .query(`select * from puestos where fk_administrador = '${data[20]}' and nombre='${data[10]}' `,
                 function (error, results, fields) {
                 if (error) reject(error) 
                 var stringss=JSON.stringify(results);
                 var resu =  JSON.parse(stringss); 
                 if(resu[0]){
                     client
                  .query(`insert into empleados (nombre,ApellidoP,ApellidoM,Curp,RFC,FechaNacimiento,Sexo,EstadoCivil,CentroTrabajo,correo,AreaTrabajo,Puesto,TipoPuesto,NivelEstudios,TipoPersonal,JornadaTrabajo,TipoContratacion,TiempoPuesto,ExperienciaLaboral,RotacionTurnos,fk_administrador,ATSContestado,RPContestado,EEOContestado,ATSDetectado,EmpleadoActivo) values ('${data[0].toUpperCase() }', '${data[1].toUpperCase() }', '${data[2].toUpperCase() }', '${data[3].toUpperCase() }', '${data[4].toUpperCase() }', '${data[5].toUpperCase() }', '${data[6].toUpperCase() }', '${data[7].toUpperCase() }', '${data[19].toUpperCase() }','${correo}', '${data[9].toUpperCase() }', '${data[10].toUpperCase() }', '${data[11].toUpperCase() }', '${data[12].toUpperCase() }', '${data[13].toUpperCase() }', '${data[14].toUpperCase() }', '${data[15].toUpperCase() }', '${data[16].toUpperCase() }', '${data[17].toUpperCase() }', '${data[18].toUpperCase() }','${data[20].toUpperCase() }','false','false','false','false','true')`); 
                  resolve({
                    message: 'registro exitoso',
                    nombre:data[0],
                    apellidoP:data[1],
                    apellidoM:data[2],
                  });

                 }else{
                  resolve({
                     
                    valor1:data[10],
                    message: 'el puesto no existe',
                  });
                 }
                },
              )
               }else{
                resolve({
                  valor2:data[9],
                  message: 'el departamento no existe',
                });
               }
              },
            )
             }else{
              resolve({
                valor3:data[19],
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
    .query(`select * from  administrador where correo='${data[8]}'  `,
     function (error, results, fields) {
     if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      resolve(resultados)
       client
       .query(`insert into empleados (nombre,ApellidoP,ApellidoM,Curp,RFC,FechaNacimiento,Sexo,EstadoCivil,correo,AreaTrabajo,Puesto,TipoPuesto,NivelEstudios,TipoPersonal,JornadaTrabajo,TipoContratacion,TiempoPuesto,ExperienciaLaboral,RotacionTurnos,fk_administrador) values ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}', '${data[5]}', '${data[6]}', '${data[7]}', '${data[8]}', '${data[9]}', '${data[10]}', '${data[11]}', '${data[12]}', '${data[13]}', '${data[14]}', '${data[15]}', '${data[16]}', '${data[17]}', '${data[18]}','${resultados[0].id}')`); 
       return  client
    },
  )
  })
};


const AtsPage1 = async data => {

return new Promise((resolve, reject) => {  
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[4]}','11','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','1','${data[3]}','${data[2]}')`); 
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','2','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','3','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','4','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','5','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','6','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','7','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','8','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','9','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','10','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','12','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','13','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','14','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','15','${data[3]}','${data[2]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[0]}','16','${data[3]}','${data[2]}')`);
      client.query(`update empleados set ATSContestado = 'true' where id = '${data[3]}'`);
      client.query(`insert into periodos(fk_empleados,periodo,encuesta,fechaEvaluacion) values ('${data[3]}','${data[2]}','ATS','${data[5]}')`);    

      client
        .query(`select Max(id) as idMaximo from correos where fk_empleados='${[data[3]]}' and encuesta = "ATS"`,
          function (error, redults, fields) {
          var string=JSON.stringify(redults);
        var resultados1 =  JSON.parse(string); 
        resolve(resultados1)                
        var maximo = resultados1[0].idMaximo
        client.query(`update correos set contestado ='true' where id = ${maximo} `); 
        })   
        return client  
      
      })
    };
const AtsPage4 = async data => {      
  return new Promise((resolve, reject) => {
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[2]}','11','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[3]}','1','${data[1]}','${data[0]}')`); 
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[4]}','2','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[5]}','3','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[6]}','4','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[7]}','5','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[8]}','6','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[9]}','7','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[10]}','8','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[11]}','9','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[12]}','10','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[13]}','12','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[14]}','13','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[15]}','14','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[16]}','15','${data[1]}','${data[0]}')`);
      client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados,Periodo) values ('${data[17]}','16','${data[1]}','${data[0]}')`);
      client.query(`update empleados set ATSContestado = 'true' where id = '${data[1]}'`);
      client.query(`insert into periodos(fk_empleados,periodo,encuesta,fechaEvaluacion) values ('${data[1]}','${data[0]}','ATS','${data[19]}')`);    
      if(data[18]=='Si'){
        client.query(`update empleados set ATSDetectado='true' where id = ${data[1]} `);    
      }

      client
        .query(`select Max(id) as idMaximo from correos where fk_empleados='${[data[1]]}' and encuesta = "ATS"`,
          function (error, redults, fields) {
          var string=JSON.stringify(redults);
        var resultados1 =  JSON.parse(string); 
        resolve(resultados1)                
        var maximo = resultados1[0].idMaximo
        client.query(`update correos set contestado ='true' where id = ${maximo} `); 
        })


    })
  };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const RPPage8 = async data => {
  return new Promise((resolve, reject) => {
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[2]}','47','${data[1]}','${data[0]}','${0}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[3]}','1','${data[1]}','${data[0]}','${data[4]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[5]}','2','${data[1]}','${data[0]}','${data[6]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[7]}','3','${data[1]}','${data[0]}','${data[8]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[9]}','4','${data[1]}','${data[0]}','${data[10]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[11]}','5','${data[1]}','${data[0]}','${data[12]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[13]}','6','${data[1]}','${data[0]}','${data[14]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[15]}','7','${data[1]}','${data[0]}','${data[16]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[17]}','8','${data[1]}','${data[0]}','${data[18]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[19]}','9','${data[1]}','${data[0]}','${data[20]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[21]}','10','${data[1]}','${data[0]}','${data[22]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[23]}','11','${data[1]}','${data[0]}','${data[24]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[25]}','12','${data[1]}','${data[0]}','${data[26]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[27]}','13','${data[1]}','${data[0]}','${data[28]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[29]}','14','${data[1]}','${data[0]}','${data[30]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[31]}','15','${data[1]}','${data[0]}','${data[32]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[33]}','16','${data[1]}','${data[0]}','${data[34]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[35]}','17','${data[1]}','${data[0]}','${data[36]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[37]}','18','${data[1]}','${data[0]}','${data[38]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[39]}','19','${data[1]}','${data[0]}','${data[40]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[41]}','20','${data[1]}','${data[0]}','${data[42]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[43]}','21','${data[1]}','${data[0]}','${data[44]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[45]}','22','${data[1]}','${data[0]}','${data[46]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[47]}','23','${data[1]}','${data[0]}','${data[48]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[49]}','24','${data[1]}','${data[0]}','${data[50]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[51]}','25','${data[1]}','${data[0]}','${data[52]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[53]}','26','${data[1]}','${data[0]}','${data[54]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[55]}','27','${data[1]}','${data[0]}','${data[56]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[57]}','28','${data[1]}','${data[0]}','${data[58]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[59]}','29','${data[1]}','${data[0]}','${data[60]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[61]}','30','${data[1]}','${data[0]}','${data[62]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[63]}','31','${data[1]}','${data[0]}','${data[64]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[65]}','32','${data[1]}','${data[0]}','${data[66]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[67]}','33','${data[1]}','${data[0]}','${data[68]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[69]}','34','${data[1]}','${data[0]}','${data[70]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[71]}','35','${data[1]}','${data[0]}','${data[72]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[73]}','36','${data[1]}','${data[0]}','${data[74]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[75]}','37','${data[1]}','${data[0]}','${data[76]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[77]}','38','${data[1]}','${data[0]}','${data[78]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[79]}','39','${data[1]}','${data[0]}','${data[80]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[81]}','40','${data[1]}','${data[0]}','${data[82]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[83]}','48','${data[1]}','${data[0]}','${data[84]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[85]}','41','${data[1]}','${data[0]}','${data[86]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[87]}','42','${data[1]}','${data[0]}','${data[88]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[89]}','43','${data[1]}','${data[0]}','${data[90]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[91]}','49','${data[1]}','${data[0]}','${data[92]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[93]}','44','${data[1]}','${data[0]}','${data[94]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[95]}','45','${data[1]}','${data[0]}','${data[96]}')`); 
    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP,Periodo,ponderacion) values ('${data[97]}','46','${data[1]}','${data[0]}','${data[98]}')`); 

    client.query(`update empleados set RPContestado ='true' where id = '${data[1]}'`);   
    client.query(`insert into periodos(fk_Empleados,periodo,encuesta,fechaEvaluacion) values ('${data[1]}','${data[0]}','RP','${data[99]}')`);

    client
        .query(`select Max(id) as idMaximo from correos where fk_Empleados='${[data[1]]}' and encuesta = "RP"`,
          function (error, redults, fields) {
          var string=JSON.stringify(redults);
        var resultados1 =  JSON.parse(string); 
        resolve(resultados1)                
        var maximo = resultados1[0].idMaximo
        client.query(`update correos set contestado ='true' where id = ${maximo} `); 
        })
       resolve({message:"registro exitoso"}) 
     })

  };
  

const RPValidadorPage7 = async data => {
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


const EEOPage14 = async data => {

  return new Promise((resolve, reject) => {
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[2]}','73','${data[1]}','${data[0]}',${0})`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[3]}','1','${data[1]}','${data[0]}','${data[4]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[5]}','2','${data[1]}','${data[0]}','${data[6]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[7]}','3','${data[1]}','${data[0]}','${data[8]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[9]}','4','${data[1]}','${data[0]}','${data[10]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[11]}','5','${data[1]}','${data[0]}','${data[12]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[13]}','6','${data[1]}','${data[0]}','${data[14]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[15]}','7','${data[1]}','${data[0]}','${data[16]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[17]}','8','${data[1]}','${data[0]}','${data[18]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[19]}','9','${data[1]}','${data[0]}','${data[20]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[21]}','10','${data[1]}','${data[0]}','${data[22]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[23]}','11','${data[1]}','${data[0]}','${data[24]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[25]}','12','${data[1]}','${data[0]}','${data[26]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[27]}','13','${data[1]}','${data[0]}','${data[28]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[29]}','14','${data[1]}','${data[0]}','${data[30]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[31]}','15','${data[1]}','${data[0]}','${data[32]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[33]}','16','${data[1]}','${data[0]}','${data[34]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[35]}','17','${data[1]}','${data[0]}','${data[36]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[37]}','18','${data[1]}','${data[0]}','${data[38]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[39]}','19','${data[1]}','${data[0]}','${data[40]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[41]}','20','${data[1]}','${data[0]}','${data[42]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[43]}','21','${data[1]}','${data[0]}','${data[44]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[45]}','22','${data[1]}','${data[0]}','${data[46]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[47]}','23','${data[1]}','${data[0]}','${data[48]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[49]}','24','${data[1]}','${data[0]}','${data[50]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[51]}','25','${data[1]}','${data[0]}','${data[52]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[53]}','26','${data[1]}','${data[0]}','${data[54]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[55]}','27','${data[1]}','${data[0]}','${data[56]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[57]}','28','${data[1]}','${data[0]}','${data[58]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[59]}','29','${data[1]}','${data[0]}','${data[60]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[61]}','30','${data[1]}','${data[0]}','${data[62]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[63]}','31','${data[1]}','${data[0]}','${data[64]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[65]}','32','${data[1]}','${data[0]}','${data[66]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[67]}','33','${data[1]}','${data[0]}','${data[68]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[69]}','34','${data[1]}','${data[0]}','${data[70]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[71]}','35','${data[1]}','${data[0]}','${data[72]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[73]}','36','${data[1]}','${data[0]}','${data[74]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[75]}','37','${data[1]}','${data[0]}','${data[76]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[77]}','38','${data[1]}','${data[0]}','${data[78]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[79]}','39','${data[1]}','${data[0]}','${data[80]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[81]}','40','${data[1]}','${data[0]}','${data[82]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[83]}','41','${data[1]}','${data[0]}','${data[84]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[85]}','42','${data[1]}','${data[0]}','${data[86]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[87]}','43','${data[1]}','${data[0]}','${data[88]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[89]}','44','${data[1]}','${data[0]}','${data[90]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[91]}','45','${data[1]}','${data[0]}','${data[92]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[93]}','46','${data[1]}','${data[0]}','${data[94]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[95]}','47','${data[1]}','${data[0]}','${data[96]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[97]}','48','${data[1]}','${data[0]}','${data[98]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[99]}','49','${data[1]}','${data[0]}','${data[100]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[101]}','50','${data[1]}','${data[0]}','${data[102]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[103]}','51','${data[1]}','${data[0]}','${data[104]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[105]}','52','${data[1]}','${data[0]}','${data[106]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[107]}','53','${data[1]}','${data[0]}','${data[108]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[109]}','54','${data[1]}','${data[0]}','${data[110]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[111]}','55','${data[1]}','${data[0]}','${data[112]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[113]}','56','${data[1]}','${data[0]}','${data[114]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[115]}','57','${data[1]}','${data[0]}','${data[116]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[117]}','58','${data[1]}','${data[0]}','${data[118]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[119]}','59','${data[1]}','${data[0]}','${data[120]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[121]}','60','${data[1]}','${data[0]}','${data[122]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[123]}','61','${data[1]}','${data[0]}','${data[124]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[125]}','62','${data[1]}','${data[0]}','${data[126]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[127]}','63','${data[1]}','${data[0]}','${data[128]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[129]}','64','${data[1]}','${data[0]}','${data[130]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[131]}','65','${data[1]}','${data[0]}','${data[132]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[133]}','66','${data[1]}','${data[0]}','${data[134]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[135]}','67','${data[1]}','${data[0]}','${data[136]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[137]}','68','${data[1]}','${data[0]}','${data[138]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[139]}','69','${data[1]}','${data[0]}','${data[140]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[141]}','70','${data[1]}','${data[0]}','${data[142]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[143]}','71','${data[1]}','${data[0]}','${data[144]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[145]}','72','${data[1]}','${data[0]}','${data[146]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[147]}','74','${data[1]}','${data[0]}','${data[148]}')`); 
    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados,Periodo,ponderacion) values ('${data[149]}','75','${data[1]}','${data[0]}','${data[150]}')`); 

    client.query(`update empleados set EEOContestado ='true' where id = '${data[1]}'`);   
    client.query(`insert into periodos(fk_empleados,periodo,encuesta,fechaEvaluacion) values ('${data[1]}','${data[0]}','EEO','${data[151]}')`);

    client
        .query(`select Max(id) as idMaximo from correos where fk_empleados='${[data[1]]}' and encuesta = "EEO"`,
          function (error, redults, fields) {
          var string=JSON.stringify(redults);
        var resultados1 =  JSON.parse(string); 
        resolve(resultados1)                
        var maximo = resultados1[0].idMaximo
        client.query(`update correos set contestado ='true' where id = ${maximo} `); 
        })
       resolve({message:"registro exitoso"}) 
    })
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const AtsPoliticaPrivacidad = async data => {
return  new Promise((resolve, reject) => {
  client
  .query(`select * from  empleados where correo='${data[0]}'`,
  function (error, results, fields) {
  if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      client.query(`select * from periodos where fk_empleados= '${resultados[0].id}' and encuesta= "ATS" and periodo = '${data[1]}'`,function(error,results2,fields){
        var string2=JSON.stringify(results2);
        var resultados2 =  JSON.parse(string2);
        if(resultados2[0]){
          resolve({message:"Evaluacion resuelta"})  
        }else{
          resolve(resultados[0])  
        }
      })
    },
)
})
};


const RPPoliticaPrivacidad = async data => {
  return  new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[0]}'`,
        function (error, results, fields) {
        if (error) reject(error) 
        // if(results[0]){
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        client.query(`select * from periodos where fk_empleados= '${resultados[0].id}' and encuesta= "RP" and periodo = '${data[1]}' `,function(error,results2,fields){
          var string2=JSON.stringify(results2);
          var resultados2 =  JSON.parse(string2);
          if(resultados2[0]){
            resolve({message:"Evaluacion resuelta"})  
          }else{
            resolve(resultados[0])  
          }
        })
      },
    )
    })
  };

const EEOPoliticaPrivacidad = async data => {
  return  new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[0]}'`,
        function (error, results, fields) {
        if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        client.query(`select * from periodos where fk_empleados= '${resultados[0].id}' and encuesta= "EEO" and periodo = '${data[1]}' `,function(error,results2,fields){
          var string2=JSON.stringify(results2);
          var resultados2 =  JSON.parse(string2);
          if(resultados2[0]){
            resolve({message:"Evaluacion resuelta"})  
          }else{
            resolve(resultados[0])  
          }
        })
      },
    )
    })
  };



const  SendMail = async (args) => {
  console.log("args",args)
  var str = args;
  var nombres = str.filter(function (item) {
    return !(parseInt(item) == item);
  });
  var ids = str.filter(function (item) {
    return (parseInt(item) == item);
  });
  return  new Promise((resolve, reject) => {   
  var LaFecha=new Date();
  var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasem=new Array('domingo','lunes','martes','miercoles','jueves','viernes','sabado');
  var diasemana=LaFecha.getDay();
  var FechaCompleta="";
  var NumeroDeMes="";
  var hora = LaFecha.getHours(); 
  var minuto = LaFecha.getMinutes(); 
  var segundo = LaFecha.getSeconds(); 
  NumeroDeMes=LaFecha.getMonth();
  FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear()+" "+hora+":"+minuto+":"+segundo;
   var transporter = nodemailer.createTransport({
      secure: false,
      host: 'mail.diagnostico035.com',
      port: 587,
      auth: {
              user: 'info@diagnostico035.com',
              pass: 'zAvb54$3',
          },
      tls: {rejectUnauthorized: false},
      });
      var encuesta ="";
      var url = "" ;
    if(ids[ids.length - 2]==1){

      encuesta="ATS"
      url =  "https://eval.diagnostico035.com/ATS"

    }if(ids[ids.length - 2]==2){
      url =  "https://eval.diagnostico035.com/RP"
      encuesta="RP"
    }if(ids[ids.length - 2]==3){
      url =  "https://eval.diagnostico035.com/EEO"
      encuesta="EEO"
    }
        nombres.map(rows=>{
          console.log("rows",rows);

        const mailOptions = {
        from: 'info@diagnostico035.com',
        to: `jesus.francisco@ads.com.mx,${rows}`,
        subject:`Evaluación ${encuesta} de Diagnostico035`,
        html: 
        `<p>Diagnóstico035 es una herramienta en la nube (100% web) que te ayuda a dar cumplimiento a la <strong> Normatividad NOM-035-STPS-2018 </strong>, a través de la evaluación de cada uno de tus colaboradores con el fin de identificar, analizar y mitigar los factores de riesgo psicosocial de tu empresa.
                    <br/>
                    <br/>
                    Basado en su solicitud, adjunto en este correo la liga de acceso al sistema de evaluaciones.
                    <br/>
                    <br/>
                    <strong>No olvide completar de forma satisfactoria el total de preguntas antes de enviar su evaluación.</strong>
                    <br/>
                    <strong>Acceda al siguiente link para completar el proceso ${url}</strong>
                    <br/>
                    <br/>

                    para mayor información visite nuestro canal de youtube https://www.youtube.com/channel/UC2isBB9Kv5lJE5rZsfU5xPw.
                    <br/>
                    <br/>
                </p>`,
                text:`Saludos cordiales, 
                <center><br/>
                <br/>
                El equipo de desarrollo de Diagnostico035<br/>
                www.diagnostico035.com<br/></center>`
    };
      transporter.sendMail(mailOptions, function (err, info) {
        console.log("info",info)
        if(err){
          console.log("este es el error" , err)
          reject("err",err)
        }else{
          resolve({message:`envio exitoso a ${rows}`},          
          )
        }
      });
    })
    
    ids.map(row=>{
      client.query(`insert into correos(Encuesta,fecha,fk_empleados,contestado,fk_administrador) values ('${encuesta}','${FechaCompleta}','${row}','false','${ids[ids.length - 1]}')`); 
      return  client
    })
})
}

  const getUsers = async data => {
  return  new Promise((resolve, reject) => {
      client
      .query(`select empleados.id,empleados.nombre, empleados.ApellidoP, empleados.ApellidoM,empleados.Curp,empleados.RFC,empleados.FechaNacimiento,empleados.Sexo ,empleados.EstadoCivil,empleados.CentroTrabajo,empleados.correo, empleados.AreaTrabajo,empleados.Puesto,empleados.TipoPuesto,empleados.NivelEstudios,empleados.TipoPersonal,empleados.JornadaTrabajo,empleados.TipoContratacion,empleados.TiempoPuesto,empleados.ExperienciaLaboral,empleados.RotacionTurnos,empleados.fk_Administrador,empleados.ATSContestado,empleados.RPContestado,empleados.EEOContestado,empleados.ATSDetectado,empleados.EmpleadoActivo from empleados inner join administrador on empleados.fk_administrador = administrador.id where empleados.fk_administrador = '${data.data[0]}' and empleados.EmpleadoActivo ='true'`,
        function (error, results, fields) {
        if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados) 
      },
    )
    })
  };
  const ResultSingleSurvey = async data => {
  return  new Promise((resolve, reject) => {
      client
      .query(`select * from respuestasats inner join empleados on respuestasats.fk_empleados = empleados.id where respuestasats.fk_empleados = '${data[0]}' and respuestasats.periodo = '${data[1]}' `,
        function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados
        ) 
      
      },
    )
    })
  };


  const ResultSingleSurveyRP = async data => {
      return  new Promise((resolve, reject) => {
          client
          .query(`select * from respuestasrp inner join empleados on respuestasrp.fk_empleadosrp = empleados.id where respuestasrp.fk_empleadosrp ='${data[0]}' and respuestasrp.periodo ='${data[1]}' `,
            function (error, results, fields) {
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string); 
            resolve(resultados
            ) 
          },
        )
      })
    };
    // `select * from empleados inner join respuestaseeo on respuestaseeo.fk_empleados = empleados.id where empleados.id =' ${data[0]}'  and respuestaseeo.periodo='${data[1]}'`
    // `select * from respuestaseeo inner join empleados on respuestaseeo.fk_empleados = empleados.id where respuestaseeo.fk_empleados = '${data[0]}' and respuestaseeo.periodo ='${data[1]}' `

    const ResultSingleSurveyEEO = async data => {
      return  new Promise((resolve, reject) => {
          client
          .query(`select * from respuestaseeo inner join empleados on respuestaseeo.fk_empleados = empleados.id where respuestaseeo.fk_empleados = '${data[0]}' and respuestaseeo.periodo ='${data[1]}' `,
            function (error, results, fields) {
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string); 
            resolve(resultados
            ) 
          },
        )
        })
      };


const GetAdmin = async data => {
  return  new Promise((resolve, reject) => {
    client
    .query(`select empleados.id from empleados inner join administrador on empleados.fk_administrador = administrador.id where administrador.correo ='${data[0]}' `,
      function (error, results, fields) {
      if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      resolve(resultados) 
    },
  )
  })
  };

const AuthRegisterSingleEmployee = async data => {
return new Promise((resolve, reject) => {
  client.query(`select * from  administrador where id='${data[0]}'`,
  function (error, results, fields) {
    var string=JSON.stringify(results);
    var resultados =  JSON.parse(string); 
      client.query(`select count(id) as max from empleados where empleados.fk_administrador = ' ${resultados[0].id}'`,  function (error, valores, fields) {
      var val=JSON.stringify(valores);
      var valor =  JSON.parse(val); 
      resolve(valor) 
      return  client
      }) 
    },
  )
})
};

const InactiveAdmin = async data => {
  return  new Promise((resolve, reject) => {
    client
    .query(`update superusuario set Activo='false' where id  ='${data[0]}'` );
    client
    .query(`update administrador set Activo='false' where fk_superusuario = '${data[0]}'` );
    resolve({message:"Usuario Blqueado"})
    })
  };

const RegisterSucursales = async data => { 
  return  new Promise((resolve, reject) => {
    client
    .query(`select * from  administrador where correo='${data[11]}' `,
    function (error, results, fields) {
    if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      resolve(resultados) 
      client
      .query(`insert into sucursales(nombreSucursal,calle,numExt,numInt,colonia,CP,Ciudad,Estado,actividad,telefono,actividades,fk_administrador,SucursalActiva) values ('${data[0].toUpperCase() }','${data[1].toUpperCase() }','${data[2] }','${data[3]}','${data[4].toUpperCase() }','${data[5].toUpperCase() }','${data[6].toUpperCase() }','${data[7].toUpperCase() }','${data[8].toUpperCase() }','${data[9].toUpperCase() }','${data[10].toUpperCase() }','${resultados[0].id}','true')`); 
      return  client
    },
  )
  })
  };

const GetSucursales = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
            client.query(`select  * from sucursales where fk_administrador ='${resultados[0].id}' and SucursalActiva='true'`,
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

const RegisterApartments = async data => { 
  return  new Promise((resolve, reject) => {
    client
    .query(`select * from  administrador where correo='${data[1]}' `,
    function (error, results, fields) {
    if (error) reject(error) 
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string); 
      resolve(resultados) 
      client
      .query(`insert into departamentos(nombre,fk_Administrador,DepartamentoActivo) values ('${data[0].toUpperCase() }','${resultados[0].id}', 'true')`); 
      return  client
    },
  )
  })
  };

const GetDeptos = async data => { 
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
      .query(`insert into puestos(nombre,fk_Administrador,PuestoActivo) values ('${data[0].toUpperCase() }','${resultados[0].id}','true')`); 
      return  client
    },
  )
  })
  };

const GetPuestos = async data => { 
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
  return new Promise((resolve, reject) => {
    client.query(`update empleados set nombre='${data[0].toUpperCase() }',ApellidoP ='${data[1].toUpperCase() }',ApellidoM='${data[2].toUpperCase() }',Curp='${data[3].toUpperCase() }',RFC='${data[4].toUpperCase() }', Sexo ='${data[5].toUpperCase() }',CentroTrabajo='${data[6].toUpperCase() }',correo='${data[7].toUpperCase() }',AreaTrabajo='${data[8].toUpperCase() }',Puesto='${data[9].toUpperCase() }',TipoPuesto= '${data[10].toUpperCase() }'  where id ='${data[11]}' and fk_administrador='${data[12]}'`)
    resolve({message:"actualizacion exitosa"}) 
    })
  };


const UpdateSucursales = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data[10]}'`,
  function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`update sucursales set nombreSucursal='${data[0].toUpperCase() }',calle ='${data[1].toUpperCase() }',numExt='${data[2].toUpperCase() }',numInt='${data[3].toUpperCase() }',colonia='${data[4].toUpperCase() }', CP ='${data[5].toUpperCase() }',ciudad='${data[6].toUpperCase() }',telefono='${data[7].toUpperCase() }',actividades='${data[9].toUpperCase() }' where id ='${data[8]}' and fk_administrador='${resultados[0].id}'`)
    resolve(client) 
    return client
    },
  )
  })
  };

const UpdateDeptos = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data[2]}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`update departamentos set nombre='${data[0].toUpperCase() }' where id ='${data[1]}' and fk_administrador='${resultados[0].id}'`)
      resolve(client) 
      return client
    },
  )
  })
};    

const UpdatePuestos = async data => { 
  
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  administrador where correo='${data[2]}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      client.query(`update puestos set nombre='${data[0].toUpperCase() }' where id ='${data[1]}' and fk_administrador='${resultados[0].id}'`)
      resolve(client) 
      return client
    },
  )
  })
  };    
const GetPonderacion = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  ponderacionrp`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
      return client
    },
  )
  })
  };      

const GetPonderacionEEO = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select  *  from  ponderacionEEO`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
      return client
    },
  )
  })
  };
                                                                  
const GetEmployeesResolvesSurveyATS = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.ATSContestado from empleados where fk_Administrador='${data[0]}' and ATSContestado='true' and EmpleadoActivo='true'`,
  function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
    resolve(resultados)
    return client
    },)
  })
  };
const GetEmployeesResolvesSurveyRP = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.RPContestado from empleados where fk_Administrador='${data[0]}' and RPContestado='true' and EmpleadoActivo='true'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
      return client
    },
  )
  })
  };
const GetEmployeesResolvesSurveyEEO = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.EEOContestado from empleados where fk_Administrador='${data[0]}' and EEOContestado='true' and EmpleadoActivo='true'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
      return client
    },
  )
  })
  };                  
                              
const GetEmployeesResolvesSurveyATSFalse = async data => { 
    return new Promise((resolve, reject) => {
      client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.ATSContestado,empleados.CentroTrabajo from empleados where fk_Administrador='${data[0]}' and ATSContestado='false' and EmpleadoActivo='true'`,
    function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string);   
        resolve(resultados)
        return client
      },)
  })
  };
const GetEmployeesResolvesSurveyRPFalse = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.RPContestado,empleados.CentroTrabajo from empleados where fk_Administrador='${data[0]}' and RPContestado='false' and EmpleadoActivo='true'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
      return client
    },
  )
  })
  };        

const GetEmployeesResolvesSurveyEEOFalse = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select  empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.correo, empleados.EEOContestado,empleados.CentroTrabajo from empleados where fk_Administrador='${data[0]}' and EEOContestado='false' and EmpleadoActivo='true'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
      return client
    },
  )
  })
  };    
const CountEmployees = async data => { 
  return new Promise((resolve, reject) => {
    client.query(`select count(id) as id from empleados where fk_administrador='${data[0]}'`,
    function (error, results, fields) {
      var string=JSON.stringify(results);
      var resultados =  JSON.parse(string);   
      resolve(resultados)
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
      return client
    },
  )
  })
  };    

  const GetEmployeesResolvesATS = async data => { 
    return new Promise((resolve, reject) => {
        if(data[0]){
          client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id where empleados.fk_Administrador='${data[0]}' and periodos.encuesta='ATS'`,                                                                                   
          function (error, results, fields) {
            if(error) {
              console.log("error" , error)
            }
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string);   
            resolve(resultados)
            return client
          },
        )
        }
    })
    };
                                                                                  
const GetresultGlobalSurveyRP = async data => {
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
      return client
    },
  )
  })
  };    
const GetresultGlobalSurveyEEO = async data => {
  let array=[]
  return  new Promise((resolve, reject) => {
      client.query(`select * from empleados inner join respuestaseeo on respuestaseeo.fk_empleados = empleados.id where empleados.id =' ${data[0]}'  and respuestaseeo.periodo='${data[1]}'`,
        function (error, results, fields) {
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string);
        array.push(resultados)
        resolve(resultados
        ) 
      },
    )
    })
  }; 
  
  const EmployeeActive = async data => {
    return  new Promise((resolve, reject) => {
        client.query(`select * from empleados where fk_administrador = '${data[0]}' and empleadoActivo='true' limit 1`,
          function (error, results, fields) {
          var string=JSON.stringify(results);
          var resultados =  JSON.parse(string);
          resolve(resultados
          ) 
        },
      )
      })
    }; 
    const DeptoActive = async data => {
      return  new Promise((resolve, reject) => {
          client.query(`select * from departamentos where fk_administrador = '${data[0]}' and DepartamentoActivo='true' limit 1`,
            function (error, results, fields) {
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string);
            resolve(resultados
            ) 
          },
        )
        })
      }; 
      const SucActive = async data => {
        return  new Promise((resolve, reject) => {
            client.query(`select * from sucursales where fk_administrador = '${data[0]}' and SucursalActiva='true' limit 1`,
              function (error, results, fields) {
              var string=JSON.stringify(results);
              var resultados =  JSON.parse(string);
              resolve(resultados
              ) 
            },
          )
          })
        }; 
        const PuestoActive = async data => {
          return  new Promise((resolve, reject) => {
              client.query(`select * from puestos where fk_administrador = '${data[0]}' and PuestoActivo='true' limit 1`,
                function (error, results, fields) {
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);
                resolve(resultados
                ) 
              },
            )
            })
          }; 
        const AddPeriodo = async data => {
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
          return  new Promise((resolve, reject) => {
              client.query(`select * from eventos where fk_administrador = '${data[0]}' and EventoActivo='true'`,
                function (error, results, fields) {
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);
                if(resultados[0]){
                  resolve(resultados
                    ) 
                }else{
                  resolve([{message:"Periodo finalizado"}]) 
                }
              },
            )
            })
          };   

        const DeletePeriodo = async data => {
          return  new Promise((resolve, reject) => {
              client.query(`update eventos set eventoActivo='false' where fk_Administrador='${data[1]}' and Descripcion='${data[0]}' `)
              resolve({message:"evento Actualizado"})
            // )
            })
          };   
  
        const GetPeriodoDesabilited = async data => {
          return  new Promise((resolve, reject) => {
              client.query(`select * from eventos where fk_administrador = '${data[0]}' and EventoActivo='false'`,
                function (error, results, fields) {
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);
                resolve(resultados
                ) 
              },
            )
            })
          };  

            const GetEventos = async data => {

              return  new Promise((resolve, reject) => {
                client
                .query(`select * from  eventos where fk_administrador='${data[0]}' and EventoActivo='true'`,
                  function (error, results, fields) {
                  if (error) reject(error) 
                  var string=JSON.stringify(results);
                  var resultados =  JSON.parse(string); 
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
            return  new Promise((resolve, reject) => {
              client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id  where empleados.fk_administrador='${data[0]}' and empleados.EmpleadoActivo='true'and periodos.periodo='${data[1]}' and periodos.encuesta='RP'`,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string); 
                resolve(resultados) 
              },
            )
            })
            }; 
          const GetUsersTableEmployeesthisPeriodoEEO = async data => {
            return  new Promise((resolve, reject) => {
              client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id  where empleados.fk_administrador='${data[0]}' and empleados.EmpleadoActivo='true'and periodos.periodo='${data[1]}' and periodos.encuesta='EEO'`,
                function (error, results, fields) {
                if (error) reject(error) 
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string); 
                resolve(resultados) 
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
            },
          )
          })
          }; 
        const GetUsersTableEmployeesthisPeriodoATS = async data => {
          return  new Promise((resolve, reject) => {
            client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id  where empleados.fk_administrador='${data[0]}' and empleados.EmpleadoActivo='true'and periodos.periodo='${data[1]}' and periodos.encuesta='ATS'`,
              function (error, results, fields) {
              if (error) reject(error) 
              var string=JSON.stringify(results);
              var resultados =  JSON.parse(string); 
              resolve(resultados) 
            },
          )
          })
          }; 
        const AddAdminEmpresa = async data => {
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
                        resolve({message:"admin Registrado",toke:hash})
                        client.query(`insert into administrador (nombreAdmin, apellidos , RFC , RazonSocial ,correo,contraseña,Activo,FechaRegistro,fk_superusuario,objetivo) values ('${data[0].toUpperCase() }','${data[1].toUpperCase() }','${data[2].toUpperCase() }','${data[3].toUpperCase() }','${data[4].toUpperCase() }','${hash}','true','${data[6].toUpperCase() }','${data[7]}','${data[8].toUpperCase() }')`)
                       
                        var transporter = nodemailer.createTransport({
  
                          secure: false,
                          host: 'mail.diagnostico035.com',
                          port: 587,
                          auth: {
                                  user: 'info@diagnostico035.com',
                                  pass: 'zAvb54$3',
                                 
                              },
                          tls: {rejectUnauthorized: false},
                          });
                          const mailOptions = {
                            from: 'info@diagnostico035.com', // sender address
                            to: `${data[4]},jesus.francisco@ads.com.mx`, // list of receivers
                            subject: 'Registro a Diagnóstico035', // Subject line
                            html: `<p>Empresa: ${data[3]}<br/>RFC: ${data[2]} Contraseña: ${data[5]} <br/> <br/>  Hola  ${data[0]} ${data[1]} <br/> <br/> <br/> Acabas de unirte a Diagnóstico035. Con tu suscripción, disfrutarás de: <br/> <br/>
                            - Acceso ilimitado a la aplicación durante el periodo de tu suscripción. <br/> 
                            - Evaluaciones ilimitadas de ATS, RP´s y EEO. <br/>
                            - Actualizaciones sin costo. <br/>
                            - Soporte básico ilimitado, sobre el uso de la aplicación.
                              <br/> <br/> <br/> 
                              <strong> Configuración </strong><br/>
                              Para dar de alta tu empresa, deberás ingresar a la siguiente URL, con el usuario y contraseña  enviado por tu ejecutivo.<br/><br/>
                              https://madmin.diagnostico035.com/<br/><br/>
                              Una vez hecho esto deberás ingresar a la siguiente dirección y podrás comenzar a utilizar Diagnóstico035.<br/><br/>

                              https://admin.diagnostico035.com/<br/><br/>

                              Conoce más sobre los beneficios de Diagnóstico035 en https://diagnostico035.com/
                              <br/><br/>
                              Gracias, <br/>
                              El equipo de Diagnóstico035.<br/><br/>

                              Tel: (55) 3603 9970 y (55) 5553 2049<br/>
                              Ext 101 y 102<br/>
                              www.diagnostico035.com<br/>
                            
                            
                            </p> ` // plain text body
                          };
                          
                          transporter.sendMail(mailOptions, function (err, info) {
                            if("este es el error" , err)
                              console.log(err)
                            else
                              console.log("esta es la info" ,  info);
                          });
                        return client
                      }
                    })
                  }
                })
              }
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
                resolve(resultados[0]) 
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
              resolve(resultados[0]) 
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
              },
            )
            })
            }; 
          const EditDataAdmin = async data => {
            return  new Promise((resolve, reject) => {
              bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err) {
                  reject(err,{message: 'Error',token: err}) 
                } else {
                  bcrypt.hash(data[3], salt, function(err, hash) {
                    if (err) {
                      throw err
                    } else {
                      resolve({ message: 'Actualización exitosa'})
                      client.query(`update administrador set nombreAdmin='${data[0].toUpperCase() }',Apellidos='${data[1].toUpperCase() }',correo='${data[2].toUpperCase() }',contraseña='${hash}',objetivo='${data[5].toUpperCase() }' where id='${data[4]}' `)    
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
              },
            )
            })
            }; 
          const Alert1 = async data => {
            console.log(data)
            return  new Promise((resolve, reject) => {
              var transporter = nodemailer.createTransport({
                secure: false,
                host: 'mail.diagnostico035.com',
                port: 587,
                auth: {
                        user: 'info@diagnostico035.com',
                        pass: 'zAvb54$3',
                    },
                tls: {rejectUnauthorized: false},
                });
          
                const mailOptions = {
                from: 'info@diagnostico035.com', // sender address
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
        return  new Promise((resolve, reject) => {
          var transporter = nodemailer.createTransport({
  
            secure: false,
            host: 'mail.diagnostico035.com',
            port: 587,
            auth: {
                    user: 'info@diagnostico035.com',
                    pass: 'zAvb54$3',
                   
                },
            tls: {rejectUnauthorized: false},
            });
            const mailOptions = {
            from: 'info@diagnostico035.com', // sender address
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
          return  new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
              secure: false,
              host: 'mail.diagnostico035.com',
              port: 587,
              auth: {
                      user: 'info@diagnostico035.com',
                      pass: 'zAvb54$3',
                     
                  },
              tls: {rejectUnauthorized: false},
              });
              const mailOptions = {
              from: 'info@diagnostico035.com', // sender address
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
              client.query(`insert into logos (url,fk_administrador) values ('${data[1]}','${data[0]}')`)
              resolve({message:"registro exitoso"})
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
                  resolve(resultados
                  ) 
                },
              )
              })
            };   
            
        const GetCorreos = async data => {
          return  new Promise((resolve, reject) => {
              client.query(`select * from correos inner join empleados on correos.fk_empleados = empleados.id where correos.fk_administrador = '${data[0]}'`,
                function (error, results, fields) {
                var string=JSON.stringify(results);
                var resultados =  JSON.parse(string);
                resolve(resultados
                )  
              },
            )
            })
          };   

        const GetresultGlobalSurveyATS = async data => {
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
            
        const GetLogo = async data => {
          return  new Promise((resolve, reject) => {
              client.query(`select * from logos where fk_administrador =' ${data[0]}'`,
                function (error, results, fields) {
                  if(error) {
                    console.log("error" ,error)
                  }
                if(results) { 
                  var string=JSON.stringify(results);
                  var resultados =  JSON.parse(string);
                  resolve(resultados[0]) 
                }  
              },
            )
            })
          }; 
        const ResetPassword = async data => {
          return  new Promise((resolve, reject) => {
              client.query(`select * from superusuario where correo ='${data[1]}' and rfc = '${data[0]}'`,
                function (error, results, fields) {
                  var string=JSON.stringify(results);
                  var resultados =  JSON.parse(string);
                  if(resultados[0]) { 
                    function makeid(length) {
                      var result           = '';
                      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                      var charactersLength = characters.length;
                      for ( var i = 0; i < length; i++ ) {
                         result += characters.charAt(Math.floor(Math.random() * charactersLength));
                      }
                      return result;
                   }
                   
                   var random = makeid(8)
                    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                      if (err) {
                        reject(err,{message: 'Error',token: err}) 
                      } else {
                        bcrypt.hash(random, salt, function(err, hash) {
                          if (err) {
                            throw err
                          } else {
                            client.query(`update superusuario set contraseña='${hash}' where id = '${resultados[0].id}'`)
                            var transporter = nodemailer.createTransport({
  
                              secure: false,
                              host: 'mail.diagnostico035.com',
                              port: 587,
                              auth: {
                                      user: 'info@diagnostico035.com',
                                      pass: 'zAvb54$3',
                                  },
                              tls: {rejectUnauthorized: false},
                              });
                              const mailOptions = {
                                from: 'info@diagnostico035.com', // sender address
                                to: `${data[1]},jesus.francisco@ads.com.mx`, // list of receivers
                                subject: 'Recuperación de contraseña', // Subject line
                                html: `<p>Empresa: ${resultados[0].RazonSocial}<br/>RFC: ${resultados[0].RFC}<br/>Correo : ${data[1]}  Contraseña : ${random} <br/> <br/> 
                                  Hola  ${resultados[0].nombre} ${resultados[0].apellidos} <br/> <br/> <br/> Acabas de recuperar tu contraseña, por el momento la contraseña es definida por el sistema <br/>
                                  puedes cambiarla en tu panel de inicio e ir al boton cambiar contraseña.
                                  <br/>
                                  <strong>Para cualquier duda o aclaracion consulte la siguiente guía rápida.</strong>
                                  <br/> <br/> <br/> 
                                  <strong> Configuración </strong><br/>
                                  Para dar de alta tu empresa, deberás ingresar a la siguiente URL, con el usuario y contraseña  enviado por tu ejecutivo.<br/><br/>
                                  https://madmin.diagnostico035.com/<br/><br/>
                                  Una vez hecho esto deberás ingresar a la siguiente dirección y podrás comenzar a utilizar Diagnóstico035.<br/><br/>
    
                                  https://admin.diagnostico035.com/<br/><br/>
    
                                  Conoce más sobre los beneficios de Diagnóstico035 en https://diagnostico035.com/
                                  <br/><br/>
                                  Gracias, <br/>
                                  El equipo de Diagnóstico035.<br/><br/>
    
                                  Tel: (55) 3603 9970 y (55) 5553 2049<br/>
                                  Ext 101 y 102<br/>
                                  www.diagnostico035.com<br/>                                
                                </p> ` // plain text body
                              };
                              
                              transporter.sendMail(mailOptions, function (err, info) {
                                if("este es el error" , err)
                                  console.log(err)
                                else
                                  console.log("esta es la info" ,  info);
                              });
                              resolve({message:"actualizacion exitosa"})
                          }
                        })
                      }
                    })
                  }else{
                    resolve({message:"el correo o rfc no existen"})
                  }
              },
            )
            })
          }; 
        const UpdatePassword = async data => {
          return  new Promise((resolve, reject) => {
              client.query(`select * from superusuario where id =' ${data[2]}'`,
                function (error, results, fields) {
                  var string=JSON.stringify(results);
                  var resultados =  JSON.parse(string);

                if(resultados) { 
                  bcrypt.compare(data[0],resultados[0].contraseña, function(err, result) {
                    if(result){
                      bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                        if (err) {
                          reject(err,{message: 'Error',token: err}) 
                        } else {
                          bcrypt.hash(data[1], salt, function(err, hash) {
                            if (err) {
                              throw err
                            } else {
                              client.query(`update superusuario set contraseña='${hash}' where id='${data[2]}'`)
                              resolve({message:"contraseña actualizada"})
                            }
                          })
                        }
                      })

                    }else{
                      resolve({message:"la contraseña no es correcta"})
                    }       
                })
                }  
              
              },
            )
            })
          }; 

      const UpdateLogo = async data => {
        return  new Promise((resolve, reject) => {
          client.query(`update logos set url='${data[1]}' where fk_administrador='${data[0]}'`)
          resolve({message:"registro exitoso"})
        })
        };

        const CardPay = async user => {
              const utcDate2 = new Date()
              var fechaRegistro =  utcDate2.toGMTString()
              return new Promise((resolve, reject) => {
              
                if(user[22]){ 
                  let paquete;
                  if(user[25] == '1rfc1'){
                    paquete = 1
                  }else if(user[25] == '1rfc2'){
                    paquete = 2
                  }else if(user[25] == '1rfc3'){
                    paquete = 3
                  }else if(user[25] == '1rfc4'){
                    paquete = 4
                  }
                  if(user[25] == '3rfc1'){
                    paquete = 5
                  }else if(user[25] == '3rfc2'){
                    paquete = 6
                  }else if(user[25] == '3rfc3'){
                    paquete = 7
                  }else if(user[25] == '3rfc4'){
                    paquete = 8
                  }
                  if(user[25] == '5rfc1'){
                    paquete = 9
                  }else if(user[25] == '5rfc2'){
                    paquete = 10
                  }else if(user[25] == '5rfc3'){
                    paquete = 11
                  }else if(user[25] == '5rfc4'){
                    paquete = 12
                  }
                  if(user[25] == '10rfc1'){
                    paquete = 13
                  }else if(user[25] == '10rfc2'){
                    paquete = 14
                  }else if(user[25] == '10rfc3'){
                    paquete = 15
                  }else if(user[25] == '10rfc4'){
                    paquete = 16
                  }
                  if(user[25] == '20rfc1'){
                    paquete = 17
                  }else if(user[25] == '20rfc2'){
                    paquete = 18
                  }else if(user[25] == '20rfc3'){
                    paquete = 19
                  }else if(user[25] == '20rfc4'){
                    paquete = 20
                  } 
                client
                .query(`select * from  superusuario where correo='${user[22]}'`,
                
                function (error, results, fields) {
                  var string=JSON.stringify(results);
                  var resultados =  JSON.parse(string); 
                  if(resultados[0]){
                    resolve({ message:'duplicado'})
                  }else{
                    client
                    .query(`select * from  superusuario where rfc='${user[20]}'`,
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
                            bcrypt.hash(user[23], salt, function(err, hash) {
                              if (err) {
                                throw err
                              } else {
                                client.query(`insert into cardPay (idPago,fechaPago,carrito,idPaypalCliente,nombrePaypalCliente,apellidosPaypalCliente,correoPaypalCliente,ciudadClientePaypal,direccion1PaypalCliente,direccion2PaypalCliente,cpPaypalCliente,estadoPaypalCliente,metodoPago,statusPago,subtotalTransaccion,montoTransaccion,monedaTransaccion,nombrecliente,apellidosCliente,rfcCliente,razonSocialCliente,telefonoCliente,correoCliente,contraseñaCliente,paquete,aprobado) values ('${user[0]}','${user[1]}','${user[2]}','${user[6]}','${user[4]}','${user[5]}','${user[3]}','${user[7]}','${user[8]}','${user[9]}','${user[10]}','${user[11]}','${user[12]}','${user[13]}','${user[14]}','${user[15]}','${user[16]}','${user[17]}','${user[18]}','${user[20]}','${user[19]}','${user[21]}','${user[22]}','${user[23]}','${user[24]}','false')`)
                                client.query(`insert into superusuario (nombre,apellidos,RFC,RazonSocial,telefono,correo,contraseña,activo,fechaRegistro,fk_paquetes) values('${user[17]}','${user[18]}','${user[20]}','${user[19]}','${user[21]}','${user[22]}','${hash}','true','${fechaRegistro}','${paquete}')`); 
                                resolve({ message: 'Signup exitoso',token:hash})
                                client
                                .query(`select * from  paquetes where id='${paquete}'`,
                                function (error, results, fields) {
                                  var string=JSON.stringify(results);
                                  var resultados =  JSON.parse(string); 
                                  if(resultados[0]){
                                    var transporter = nodemailer.createTransport({
                                      secure: false,
                                      host: 'mail.diagnostico035.com',
                                      port: 587,
                                      auth: {
                                              user: 'info@diagnostico035.com',
                                              pass: 'zAvb54$3',
                                            
                                          },
                                      tls: {rejectUnauthorized: false},
                                      });
                                      const mailOptions = {
                                        from: 'info@diagnostico035.com', // sender address
                                        to: `${user[22]},alma.juarez@ads.com.mx,jesus.francisco@ads.com.mx`, // list of receivers
                                        subject: 'Registro a Diagnóstico035 ', // Subject line
                                        html: `Sistema de pagos por internet.<br/><br/><p>Empresa: ${user[19]}<br/>RFC: ${user[20]}<br/>Correo : ${user[22]}  Contraseña : ${user[23]} <br/> <br/> 
                                          Hola  ${user[17]} ${user[18]} <br/> <br/> <br/> Acabas de unirte a Diagnóstico035. Con tu suscripción, disfrutarás de: <br/> <br/>
                                        - Acceso ilimitado a la aplicación durante el periodo de tu suscripción. <br/> 
                                        - Registro de   ${resultados[0].empresas} Empresas y ${resultados[0].empleados} Empleados. <br/> 
                                        - Evaluaciones ilimitadas de ATS, RP´s y EEO. <br/>
                                        - Actualizaciones sin costo. <br/>
                                        - Soporte básico ilimitado, sobre el uso de la aplicación.
                                          <br/> <br/> <br/> 
                                          <strong> Configuración </strong><br/>
                                          Para dar de alta tu empresa, deberás ingresar a la siguiente URL, con el usuario y contraseña  enviado por tu ejecutivo.<br/><br/>
                                          https://madmin.diagnostico035.com/ <br/><br/>
                                          Una vez hecho esto deberás ingresar a la siguiente dirección y podrás comenzar a utilizar Diagnóstico035.<br/><br/>

                                          https://admin.diagnostico035.com/<br/><br/>

                                          Conoce más sobre los beneficios de Diagnóstico035 en https://diagnostico035.com/
                                          <br/><br/>
                                          Gracias, <br/>
                                          El equipo de Diagnóstico035.<br/><br/>

                                          Tel: (55) 3603 9970 y (55) 5553 2049<br/>
                                          Ext 101 y 102<br/>
                                          www.diagnostico035.com<br/>                                        
                                        </p> ` // plain text body
                                      };
                                      
                                      transporter.sendMail(mailOptions, function (err, info) {
                                        if("este es el error" , err)
                                          console.log(err)
                                        else
                                          console.log("esta es la info" ,  info);
                                      });
                                  }
                                },
                              )
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
              }
            });
          };  
          
          const GetCardPay = async data => {
            return  new Promise((resolve, reject) => {
              client.query(`select * from cardpay where aprobado='false'`,function(err,results,fields){
                var string = JSON.stringify(results)
                var resultados  = JSON.parse(string)
                if(resultados[0]){
                  resolve(resultados[0])
                }
              })
            })
            }; 
          const GetCardPayRealizada = async data => {
            return  new Promise((resolve, reject) => {
              client.query(`select * from cardpay where aprobado='true'`,function(err,results,fields){
                var string = JSON.stringify(results)
                var resultados  = JSON.parse(string)
                if(resultados[0]){
                  resolve(resultados[0])
                }
              })
            })
            };  
          const UpdateCardPay = async data => {
            return  new Promise((resolve, reject) => {
              client.query(`update cardPay set aprobado='${'true'}' , noFactura='${data[0]}' where ids = '${data[1]}' `)
              resolve({message:"actualizacion exitosa"})
            })
            };  
          const VerifiDataSuperUser = async data => {
            return  new Promise((resolve, reject) => {
              client.query(`select * from superusuario where RFC='${data[0]}'`,function(err,results,fields){
                var string = JSON.stringify(results)
                var resultados  = JSON.parse(string)
                if(resultados[0]){
                 resolve({message:"rfc existente"})
                }else{
                  client.query(`select * from superusuario where RazonSocial = '${data[1]}'`,function(err,results2,fields){
                    var stringRS = JSON.stringify(results2)
                    var resultadosRS  = JSON.parse(stringRS)
                    if(resultadosRS[0]){
                      resolve({message:"rs existente"})

                    }else{
                      client.query(`select * from superusuario where correo = '${data[2]}'`,function(err,results3,fields){
                        var stringCorreo = JSON.stringify(results3)
                        var resultadosCorreo = JSON.parse(stringCorreo)
                        if(resultadosCorreo[0]){
                          resolve({message:"correo existente"})
                        }else{
                          resolve({message:"usuario no existente"})
                        }
                      })
                    }
                  })
                }
              })
            })}; 
        const GetSuperUSer = async data => {
          return  new Promise((resolve, reject) => {
            client.query(`select * from superusuario inner join paquetes on superusuario.fk_paquetes = paquetes.id where superusuario.RFC='${data[0]}' and superusuario.correo='${data[1]}'`,
            function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados  = JSON.parse(string)
              if(resultados[0]){
                resolve(resultados[0])
              }else {
                resolve({message:"usuario no encontrado"})
              }
            })
          })
          };    
            
        const RenovationLicence = async data => {
          let fecha = data[18]
          let fecha1 = fecha.substring(0,3)
          let fecha2  = fecha.substring(4,28)
          let fechaCompleta  =  fecha1.concat(","," ",fecha2)
          return  new Promise((resolve, reject) => {
            client.query(`select * from superusuario where correo='${data[17]}' and rfc = '${data[21]}'`, function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados=JSON.parse(string)
              if(resultados[0]){
                client.query(`update superusuario set fechaRegistro='${fechaCompleta}' where id='${resultados[0].id}'`)
                client.query(`insert into renovacionLicencia(idPago,fechaPago,carrito,idPaypalCliente,nombrePaypalCliente,apellidosPaypalCliente,correoPaypalCliente,ciudadClientePaypal,direccion1PaypalCliente,direccion2PaypalCliente,cpPaypalCliente,estadoPaypalCliente,metodoPago,statusPago,subtotalTransaccion,montoTransaccion,monedaTransaccion,fechaExpiracionLicencia,fk_paquetes,paquete,fk_superusuario) values ('${data[0]}','${data[1]}','${data[2]}','${data[6]}','${data[4]}','${data[5]}','${data[3]}','${data[7]}','${data[8]}','${data[9]}','${data[10]}','${data[11]}','${data[12]}','${data[13]}','${data[14]}','${data[15]}','${data[16]}','${fechaCompleta}','${data[20]}','${data[19]}','${resultados[0].id}')`)
                
                var transporter = nodemailer.createTransport({
              
                  secure: false,
                  host: 'mail.diagnostico035.com',
                  port: 587,
                  auth: {
                          user: 'info@diagnostico035.com',
                          pass: 'zAvb54$3',
                        
                      },
                  tls: {rejectUnauthorized: false},
                  });
                  const mailOptions = {
                    from: 'info@diagnostico035.com', // sender address
                    to: `${data[17]},alma.juarez@ads.com.mx,jesus.francisco@ads.com.mx`, // list of receivers
                    subject: 'Registro a Diagnóstico035 ', // Subject line
                    html: `Sistema de pagos por internet.<br/><br/><p>Empresa: ${data[24]}<br/>RFC: ${data[21]}<br/>Correo : ${data[17]}  <br/> <br/> 
                      Hola  ${data[22]} ${data[23]} <br/> <br/> <br/> Acabas de renovar tu licencia de Diagnóstico035. Con tu suscripción, seguiras disfrutando de: <br/> <br/>
                    - Acceso ilimitado a la aplicación durante el periodo de tu suscripción. <br/> 
                    - Registro de ${data[19]}  <br/> 
                    - Evaluaciones ilimitadas de ATS, RP´s y EEO. <br/>
                    - Actualizaciones sin costo. <br/>
                    - Soporte básico ilimitado, sobre el uso de la aplicación.
                      <br/> <br/> <br/> 
                      <strong> Configuración </strong><br/>
                      Para dar de alta tu empresa, deberás ingresar a la siguiente URL, con el usuario y contraseña  enviado por tu ejecutivo.<br/><br/>
                      https://madmin.diagnostico035.com/ <br/><br/>
                      Una vez hecho esto deberás ingresar a la siguiente dirección y podrás comenzar a utilizar Diagnóstico035.<br/><br/>

                      https://admin.diagnostico035.com/<br/><br/>

                      Conoce más sobre los beneficios de Diagnóstico035 en https://diagnostico035.com/
                      <br/><br/>
                      Gracias, <br/>
                      El equipo de Diagnóstico035.<br/><br/>

                      Tel: (55) 3603 9970 y (55) 5553 2049<br/>
                      Ext 101 y 102<br/>
                      www.diagnostico035.com<br/>
                    
                    
                    </p> ` // plain text body
                  };
                  
                  transporter.sendMail(mailOptions, function (err, info) {
                    if("este es el error" , err)
                      console.log(err)
                    else
                      console.log("esta es la info" ,  info);
                  });
              } 
            })
            resolve({message:"registro exitoso"})
          })
          };   
        const AddPromotions = async data => {
          return  new Promise((resolve, reject) => {
            client.query(`insert into promociones (nombre,apellidos,rfc,razonSocial,telefono,correo,contraseña,noFactura,verificado,status) values('${data[0]}','${data[1]}','${data[2]}','${data[4]}','${data[3]}','${data[5]}','${data[6]}','${data[7]}','false','pendiente')`)
            resolve({message:"registro exitoso"})
          })
          }; 
        const GetRenovacion = async data => {
          return  new Promise((resolve, reject) => {
            client.query(`select * from renovacionLicencia`, function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados = JSON.parse(string)
              if(resultados[0])
              resolve(resultados)
            })
          })
          };   
        const GetPromocion = async data => {
          return  new Promise((resolve, reject) => {
            client.query(`select * from promociones where verificado='false'`, function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados = JSON.parse(string)
              if(resultados[0])
              resolve(resultados)
            })
          })
          };         
        const ApprovedPromotion = async data => {
        const utcDate2 = new Date()
         var fechaRegistro =  utcDate2.toGMTString()
          return  new Promise((resolve, reject) => {
            client.query(`select * from promociones where idPromocion='${data[0]}'`, function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados = JSON.parse(string)
              if(resultados[0]){
                bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                  if (err) {
                    reject(err,{message: 'Error',token: err}) 
                  } else {
                bcrypt.hash(resultados[0].contraseña, salt, function(err, hash) {
                  if (err) {
                    throw err
                  } else {
                    client.query(`insert into superusuario(nombre,apellidos,RFC,RazonSocial,telefono,correo,contraseña,activo,fechaRegistro,fk_paquetes) values ('${resultados[0].nombre}','${resultados[0].apellidos}','${resultados[0].rfc}','${resultados[0].razonSocial}','${resultados[0].telefono}','${resultados[0].correo}','${hash}','true','${fechaRegistro}','3')`)
                    client.query(`update promociones set verificado='true', status='aprobado' where idPromocion='${resultados[0].idPromocion}'`)
                    resolve({ message: 'registro exitoso'})
                    var transporter = nodemailer.createTransport({
  
                      secure: false,
                      host: 'mail.diagnostico035.com',
                      port: 587,
                      auth: {
                              user: 'info@diagnostico035.com',
                              pass: 'zAvb54$3',
                             
                          },
                      tls: {rejectUnauthorized: false},
                      });
                      const mailOptions = {
                        from: 'info@diagnostico035.com', // sender address
                        to: `${resultados[0].correo},alma.juarez@ads.com.mx,jesus.francisco@ads.com.mx`, // list of receivers
                        subject: 'Registro a Diagnóstico035 ', // Subject line
                        html: `<p>Empresa: ${resultados[0].razonSocial}<br/>RFC: ${resultados[0].rfc}<br/>Correo : ${resultados[0].correo}  Contraseña : ${resultados[0].contraseña} <br/> <br/> 
                          Hola  ${resultados[0].nombre} ${resultados[0].apellidos} <br/> <br/> <br/> Acabas de unirte a Diagnóstico035. Con tu suscripción, disfrutarás de: <br/> <br/>
                        - Acceso ilimitado a la aplicación durante el periodo de tu suscripción. <br/> 
                        - Registro de  1 Empresas y 100 Empleados. <br/> 
                        - Evaluaciones ilimitadas de ATS, RP´s y EEO. <br/>
                        - Actualizaciones sin costo. <br/>
                        - Soporte básico ilimitado, sobre el uso de la aplicación.
                          <br/> <br/> <br/> 
                          <strong> Configuración </strong><br/>
                          Para dar de alta tu empresa, deberás ingresar a la siguiente URL, con el usuario y contraseña  enviado por tu ejecutivo.<br/><br/>
                          https://madmin.diagnostico035.com/<br/><br/>
                          Una vez hecho esto deberás ingresar a la siguiente dirección y podrás comenzar a utilizar Diagnóstico035.<br/><br/>

                          https://admin.diagnostico035.com/<br/><br/>

                          Conoce más sobre los beneficios de Diagnóstico035 en https://diagnostico035.com/
                          <br/><br/>
                          Gracias, <br/>
                          El equipo de Diagnóstico035.<br/><br/>

                          Tel: (55) 3603 9970 y (55) 5553 2049<br/>
                          Ext 101 y 102<br/>
                          www.diagnostico035.com<br/>
                        
                        
                        </p> ` // plain text body
                      };
                      
                      transporter.sendMail(mailOptions, function (err, info) {
                        if("este es el error" , err)
                          console.log(err)
                        else
                          console.log("esta es la info" ,  info);
                      });
             
                    return client
                  }
                })
              }
              })
              }
             
            })
          })
          };      
        const RejectPromotion = async data => {
          return  new Promise((resolve, reject) => {
            client.query(`select * from promociones where idPromocion='${data[0]}'`, function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados = JSON.parse(string)
              if(resultados[0]){
                var transporter = nodemailer.createTransport({
  
                  secure: false,
                  host: 'mail.diagnostico035.com',
                  port: 587,
                  auth: {
                          user: 'info@diagnostico035.com',
                          pass: 'zAvb54$3',
                         
                      },
                  tls: {rejectUnauthorized: false},
                  });
                  const mailOptions = {
                    from: 'info@diagnostico035.com', // sender address
                    to: `${resultados[0].correo},alma.juarez@ads.com.mx,jesus.francisco@ads.com.mx`, // list of receivers
                    subject: 'Su solicitud no fue aceptada', // Subject line
                    html: `<p>Empresa: ${resultados[0].razonSocial}<br/>RFC: ${resultados[0].rfc}<br/>Correo : ${resultados[0].correo}<br/> <br/> 
                      Estimado  ${resultados[0].nombre} ${resultados[0].apellidos} <br/> <br/> <br/> Lamentablemente su suscripción no fue aprobada<br/> <br/>
                    - Para mayor información, comuníquese a su asesor de ADS mas cercano <br/> 
                    - Presentando su número de factura y su id de proceso -- RNL${resultados[0].idPromocion} -- <br/> 
                    - Lamentamos los inconvenientes ocasionados <br/>  <br/> 
                      El equipo de Diagnóstico035.<br/><br/>
                      Tel: (55) 3603 9970 y (55) 5553 2049<br/>
                      Ext 101 y 102<br/>
                      www.diagnostico035.com<br/>
                    </p> ` // plain text body
                  };
                  
                  transporter.sendMail(mailOptions, function (err, info) {
                    if("este es el error" , err)
                      console.log(err)
                    else
                      console.log("esta es la info" ,  info);
                  });
              } 
            })
            client.query(`update promociones set verificado='true' , status = 'rechazado' where idPromocion='${data[0]}'`)
            resolve({message:"promocion rechazada"})
          })
          };      
        const GetAllSuperUser = async data => {
          return  new Promise((resolve, reject) => {
            client.query(`select * from superusuario`, function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados = JSON.parse(string)
              if(resultados[0])
              resolve(resultados)
            })
          })
          };  
    
        const GetEmpleadosGlobales = async data => {
          return  new Promise((resolve, reject) => {
            client.query(`select * from empleados where fk_administrador ='${data[0]}' `, function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados = JSON.parse(string)
              if(resultados[0])
              resolve(resultados)
            })
          })
          };  
        const GetTablePeriodo = async data => {
          return  new Promise((resolve, reject) => {
            client.query(`select * from periodos where fk_empleados ='${data[0]}' `, function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados = JSON.parse(string)
              if(resultados[0])
              resolve(resultados)
            })
          })
          };  
        const Transactions = async data => {
          return new Promise((resolve,reject) => {
            if(data[0]&& data[1] && data[2] && data[3] && data[4]){
            client.query(`insert into transaccionesVisitas(fechaIngreso,horaIngreso,direccionIP,estadoTransaccion,rfcAcceso,fk_administrador)  values ('${data[0]}' , '${data[1]}' , '${data[2]}' , 'Transaccion exitosa','${data[3]}','${data[4]}')`)
            resolve({message:"registro exitoso"})
            }else {
             client.query(`insert into transaccionesVisitas(fechaIngreso,horaIngreso,direccionIP,estadoTransaccion,rfcAcceso,fk_administrador) values ('${data[0]}' , '${data[1]}' , '${data[2]}' , 'Transaccion fallida','${data[3]}','${0}')`)
             resolve({message:"registro exitoso con sesion fallida"})
            }
          })         
          };  
        const TransactionsMadmin = async data => {
          return new Promise((resolve,reject) => {
            if(data[0]&& data[1] && data[2] && data[3] && data[4]){
            client.query(`insert into transaccionesVisitas_madmin(fechaIngreso,horaIngreso,direccionIP,estadoTransaccion,correoAcceso,fk_superusuario)  values ('${data[0]}' , '${data[1]}' , '${data[2]}' , 'Transaccion exitosa','${data[3]}','${data[4]}')`)
            resolve({message:"registro exitoso"})
            }else {
              client.query(`insert into transaccionesVisitas_madmin(fechaIngreso,horaIngreso,direccionIP,estadoTransaccion,correoAcceso,fk_superusuario) values ('${data[0]}' , '${data[1]}' , '${data[2]}' , 'Transaccion fallida','${data[3]}','${0}')`)
              resolve({message:"registro exitoso con sesion fallida"})
            }
          })         
          }; 
        const TransactionsEval= async data => {
          return new Promise((resolve,reject) => {
            client.query(`insert into transaccionesVisitas_eval(fechaIngreso,horaIngreso,direccionIP,estadoTransaccion,correoAcceso,evaluacion)  values ('${data[0]}' , '${data[1]}' , '00000' , 'Transaccion exitosa','${data[2]}','${data[3]}')`)
            resolve({message:"Transaccion exitosa"})
          })         
        };  

        const updateEvalEEO= async data => {
          return new Promise((resolve,reject) => {
            for(var i = 1; i <= data.length; i ++ ){
            }
            
          })         
        };     

        const GetSingleEmployee= async data => {
          return new Promise((resolve,reject) => {
            client.query(`select * from administrador inner join empleados on empleados.fk_administrador =  administrador.id inner join periodos on periodos.fk_empleados  =  empleados.id where  administrador.id='${data[0]}' `, function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados = JSON.parse(string)
              resolve(resultados)
            })
          })         
        }; 

        const DeleteEval= async data => {
          return new Promise((resolve,reject) => {
            if(data[2]  == 'ATS'){
              client.query(`update empleados set atsContestado = 'false' where  id = '${data[0]}'`)
              client.query(`update empleados set atsDetectado = 'false' where  id = '${data[0]}'`)
              client.query(`delete from respuestasats where fk_empleados = '${data[0]}' and Periodo  = '${data[1]}'`)
              client.query(`delete from periodos where fk_empleados = '${data[0]}' and encuesta  = '${data[2]}'`)
              client.query(` update correos set contestado = 'false' where fk_empleados = '${data[0] }' and encuesta ='${data[2]}'`)

            } else if(data[2]  == 'RP'){
              client.query(`update empleados set RPContestado = 'false' where  id = '${data[0]}'`)
              client.query(`delete from respuestasrp where fk_empleadosrp = '${data[0]}' and Periodo  = '${data[1]}'`)
              client.query(`delete from periodos where fk_empleados = '${data[0]}' and encuesta  = '${data[2]}'`)
              client.query(` update correos set contestado = 'false' where fk_empleados = '${data[0] }' and encuesta ='${data[2]}'`)

            }else if(data[2]  == 'EEO'){
              client.query(`update empleados set EEOContestado = 'false' where  id = '${data[0]}'`)
              client.query(`delete from respuestaseeo where fk_empleados = '${data[0]}' and Periodo  = '${data[1]}'`)
              client.query(`delete from periodos where fk_empleados = '${data[0]}' and encuesta  = '${data[2]}'`)
              client.query(` update correos set contestado = 'false' where fk_empleados = '${data[0] }' and encuesta ='${data[2]}'`)

            }
            resolve({message:"Evaluación removida con éxito"})
          })         
        }; 
      const GetEmployeesPerido = async data => {
        return new Promise((resolve,reject) => {
          client.query(`select * from empleados inner join periodos on periodos.fk_empleados = empleados.id where empleados.fk_administrador ='${data[0]}'`, function(err,results,fields){
              var string = JSON.stringify(results)
              var resultados = JSON.parse(string)
              resolve(resultados)
          })
        })            
      };
      const RenovacionLicencias = async data => {
        return new Promise((resolve,reject)=>{
            let substring1 = data[5].substring(0,3);
            let substring2 = data[5].substring(4,28); 
            let substring3 = data[6].substring(0,3);
            let substring4 = data[6].substring(4,28); 
           
            let idCliente = data[0];
            let rfc = data[1];
            let razonSocial = data[2];
            let nombreCliente = data[3];
            let paqueteAdquirido = data[4];  
            let fechaInicial = substring1.concat(", ").concat(substring2);
            let fechaFinal = substring3.concat(", ").concat(substring4);

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
            client.query(`update superusuario set  activo='true', fechaRegistro = '${fechaFinal}', fk_paquetes= '${paqueteAdquirido}' where id = '${idCliente}'`);
            client.query(`update administrador set  Activo='true' where fk_superusuario = '${idCliente}'`);
            client.query(`insert into datosRenovaciones(rfc,razonSocial,nombreCliente,periodoInicial,periodoFinal,paqueteActivo,fk_superusuario,fechaAdquisicion) values ('${rfc}','${razonSocial}','${nombreCliente}', '${fechaInicial}', '${fechaFinal}', '${paqueteAdquirido}', '${idCliente}', '${FechaCompleta}')`)
            resolve({message:"licencia actualizada"});

        })
      };
    const GetSuperUserWithRFC = async data => {
      return new Promise((resolve,reject) => {
        client.query(`select * from superusuario where RFC='${data[0]}' `, function(err,results,fields){
            var string = JSON.stringify(results)
            var resultados = JSON.parse(string)
            if(resultados){
              resolve(resultados)
            }
            
        })
    }) 
    }
    const UpdateSuperUser = async data => {
      console.log(data)
      return new Promise((resolve,reject) => {
        client.query(`update superusuario set nombre = '${data[1]}', apellidos = '${data[2]}', RFC = '${data[0]}', RazonSocial = '${data[3]}', telefono = '${data[4]}', correo = '${data[5]}' where id = '${data[6]}'`);
        client.query(`update ventasadminalfa set RazonSocial = '${data[3]}', telefono = '${data[4]}', RFC = '${data[0]}' where RFC = '${data[0]}'`);
        resolve({message:"Actualización exitosa"})
    }) 
    }
    
    const GetHistoryRenovation = () => {
    return new Promise((resolve,reject)=>{
      client.query(`select * from datosRenovaciones inner join superusuario on datosrenovaciones.fk_superusuario = superusuario.id`,function(err,results,fields){
        let string = JSON.stringify(results)
        let resultados = JSON.parse(string)
        resolve(resultados)
      });
    })
    }
    const GetLicence = async data => {
      return new Promise((resolve,reject) => {
        client.query(`select * from licencias where fk_superusuario = '${data[0]}'`,function(err, results, field){
          let string = JSON.stringify(results);
          let resultados = JSON.parse(string);
          resolve(resultados)
        })
      }) 
    }
    const ResendEmailSuperUSer = async data => {
      console.log("data",data)
      return new Promise((resolve,reject) => {
        function makeid(length) {
          var result           = '';
          var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for ( var i = 0; i < length; i++ ) {
             result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
       }
       
       var random = makeid(8)
       console.log("random",random)
       bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
          reject(err,{message: 'Error',token: err}) 
        } else {
        bcrypt.hash(random, salt, function(err, hash) {
          if (err) {
            throw err
          } else {
            client .query(`select * from  paquetes where id='${data[5]}'`,
            function (error, results, fields) {
              var string=JSON.stringify(results);
              var resultados =  JSON.parse(string);
              console.log("resultados",resultados) 
              if(resultados[0]){
                client.query(`update superusuario set contraseña = '${hash}' where RFC = '${data[2]}'`)
                var transporter = nodemailer.createTransport({
                  secure: false,
                  host: 'mail.diagnostico035.com',
                  port: 587,
                  auth: {
                          user: 'info@diagnostico035.com',
                          pass: 'zAvb54$3',
                         
                      },
                  tls: {rejectUnauthorized: false},
                  });
                  const mailOptions = {
                    from: 'info@diagnostico035.com', // sender address
                    to: `${data[4]},jesus.francisco@ads.com.mx,armando.franco@ads.com.mx`, // list of receivers
                    subject: 'Registro a Diagnóstico035 ', // Subject line
                    html: `<p>Empresa: <strong>${data[3]}</strong> <br/>RFC: <strong>${data[2]}</strong><br/>Correo:<strong> ${data[4]}</strong> <br/>  Contraseña: <strong>${random}</strong> <br/> <br/> 
                      Hola <strong> ${data[0]} ${data[1]}</strong> <br/> <br/> Acabas de unirte a Diagnóstico035. Con tu suscripción, disfrutarás de: <br/> <br/>
                    - Acceso ilimitado a la aplicación durante el periodo de tu suscripción. <br/> 
                    - Registro de   ${resultados[0].empresas} Empresas y ${resultados[0].empleados} Empleados. <br/> 
                    - Evaluaciones ilimitadas de ATS, RP´s y EEO. <br/>
                    - Actualizaciones sin costo. <br/>
                    - Soporte básico ilimitado, sobre el uso de la aplicación.
                      <br/> <br/>  
                      <strong> Configuración </strong><br/>
                      Para dar de alta tu empresa, deberás ingresar a la siguiente URL, con el usuario y contraseña  enviado por tu ejecutivo.<br/><br/>
                      https://madmin.diagnostico035.com/<br/><br/>
                      Una vez hecho esto deberás ingresar a la siguiente dirección y podrás comenzar a utilizar Diagnóstico035.<br/><br/>

                      https://admin.diagnostico035.com/<br/><br/>
                      <br/><br/>
                      También puedes encontrar una serie de videos que te ayudaran a entender más sobre diagnóstico035 en el siguiente enlace https://www.youtube.com/channel/UC2isBB9Kv5lJE5rZsfU5xPw
                      <br/><br/>
                      <strong>Nota: Para mayor seguridad no olvide cambiar su contraseña de acceso.</strong>
                      <br/>
                      Conoce más sobre los beneficios de Diagnóstico035 en <br/> https://diagnostico035.com/
                      <br/><br/>
                      Gracias, <br/>
                      <center>
                      <strong>El equipo de Diagnóstico035.</strong><br/><br/>

                      Tel: (55) 3603 9970 y (55) 5553 2049<br/>
                      Ext 101 y 102<br/>
                      www.diagnostico035.com<br/>
                    </center>
                    
                    </p> ` // plain text body
                  };
                  
                  transporter.sendMail(mailOptions, function (err, info) {
                    if(err){
                      console.log(err)
                      console.log("este es el error" , err.response)
                    }
                    else{
                     resolve({ message:'Reenvio exitoso',token:hash})
                     console.log("esta es la info" ,  info);
                    }
                  });
              }
            },
          )
            return client
          }
        })
        }
      })
      }) 
    }
      module.exports = {
        ResendEmailSuperUSer,
        GetLicence,
        GetHistoryRenovation,
        UpdateSuperUser,
        GetSuperUserWithRFC,
        RenovacionLicencias,
        GetEmployeesPerido,
        DeleteEval,
        GetSingleEmployee,
        updateEvalEEO,
        TransactionsEval,
        TransactionsMadmin,
        Transactions,
        GetTablePeriodo,
        GetEmpleadosGlobales,
        GetAllSuperUser,
        RejectPromotion,
        ApprovedPromotion,
        GetPromocion,
        GetRenovacion,
        AddPromotions,
        RenovationLicence,
        GetSuperUSer,
        VerifiDataSuperUser,
        UpdateCardPay,
        GetCardPayRealizada,
        GetCardPay,
        CardPay,
        UpdateLogo,
        UpdatePassword,
        ResetPassword,
        GetLogo,
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
        InactiveAdmin,
        AuthRegisterSingleEmployee,
        ResultSingleSurvey,
        signup,
        login,
        registerEm,
        registerRazonS,
        getUsers,
        AtsPage1,
        AtsPage4,
        RPPage8,
        RPValidadorPage7,
        RPValidadorPage8,
        EEOPage14,
        AtsPoliticaPrivacidad,
        RPPoliticaPrivacidad,
        EEOPoliticaPrivacidad,

        SendMail,
        GetAdmin,
        ResultSingleSurveyRP,
        ResultSingleSurveyEEO
      }