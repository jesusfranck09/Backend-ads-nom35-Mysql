
const client = require('../database/');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const { createToken } = require('../utils');
var nodemailer = require('nodemailer');


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


const AtsPage1 = async data => {
  return new Promise((resolve, reject) => {
      client
      .query(`select * from  empleados where correo='${data[1]}'`,
       function (error, results, fields) {
       if (error) reject(error) 
        var string=JSON.stringify(results);
        var resultados =  JSON.parse(string); 
        resolve(resultados)
          client
          .query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[0]}','1','${resultados[0].id}')`); 
          return  client       
      },
    )
    })
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
            .query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[0]}','2','${resultados[0].id}')`); 
            client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[1]}','3','${resultados[0].id}')`); 
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
              .query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[0]}','4','${resultados[0].id}')`); 
              client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[1]}','5','${resultados[0].id}')`); 
              client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[2]}','6','${resultados[0].id}')`); 
              client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[3]}','7','${resultados[0].id}')`); 
              client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[4]}','8','${resultados[0].id}')`); 
              client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[5]}','9','${resultados[0].id}')`); 
              client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[6]}','10','${resultados[0].id}')`); 
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
        return new Promise((resolve, reject) => {
            client
            .query(`select * from  empleados where correo='${data[5]}'`,
             function (error, results, fields) {
             if (error) reject(error) 
              var string=JSON.stringify(results);
              var resultados =  JSON.parse(string); 
              resolve(resultados)
                client
                .query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[0]}','12','${resultados[0].id}')`); 
                client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[1]}','13','${resultados[0].id}')`); 
                client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[2]}','14','${resultados[0].id}')`); 
                client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[3]}','15','${resultados[0].id}')`); 
                client.query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[4]}','16','${resultados[0].id}')`);      
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
              resolve(resultados)
                client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[0]}','1','${resultados[0].id}')`); 
                client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[1]}','2','${resultados[0].id}')`); 
                client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[2]}','3','${resultados[0].id}')`); 
                client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[3]}','4','${resultados[0].id}')`); 
                client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[4]}','5','${resultados[0].id}')`); 
                client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[5]}','6','${resultados[0].id}')`); 
                client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[6]}','7','${resultados[0].id}')`); 
                client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[7]}','8','${resultados[0].id}')`); 
                client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[8]}','9','${resultados[0].id}')`); 

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
                  client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[0]}','10','${resultados[0].id}')`); 
                  client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[1]}','11','${resultados[0].id}')`); 
                  client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[2]}','12','${resultados[0].id}')`); 
                  client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[3]}','13','${resultados[0].id}')`);            
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
                    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[0]}','14','${resultados[0].id}')`); 
                    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[1]}','15','${resultados[0].id}')`); 
                    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[2]}','16','${resultados[0].id}')`); 
                    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[3]}','17','${resultados[0].id}')`);            
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
                    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[0]}','18','${resultados[0].id}')`); 
                    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[1]}','19','${resultados[0].id}')`); 
                    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[2]}','20','${resultados[0].id}')`); 
                    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[3]}','21','${resultados[0].id}')`);            
                    client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[4]}','22','${resultados[0].id}')`);            

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
                      client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[0]}','23','${resultados[0].id}')`); 
                      client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[1]}','24','${resultados[0].id}')`); 
                      client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[2]}','25','${resultados[0].id}')`); 
                      client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[3]}','26','${resultados[0].id}')`);            
                      client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[4]}','27','${resultados[0].id}')`);            
  
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
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[0]}','28','${resultados[0].id}')`); 
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[1]}','29','${resultados[0].id}')`); 
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[2]}','30','${resultados[0].id}')`); 
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[3]}','31','${resultados[0].id}')`);            
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[4]}','32','${resultados[0].id}')`);            
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[5]}','33','${resultados[0].id}')`); 
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[6]}','34','${resultados[0].id}')`); 
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[7]}','35','${resultados[0].id}')`); 
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[8]}','36','${resultados[0].id}')`);            
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[9]}','37','${resultados[0].id}')`);            
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[10]}','38','${resultados[0].id}')`);            
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[11]}','39','${resultados[0].id}')`);            
                        client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[12]}','40','${resultados[0].id}')`);            
    
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
                          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[0]}','41','${resultados[0].id}')`); 
                          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[1]}','42','${resultados[0].id}')`); 
                          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[2]}','43','${resultados[0].id}')`); 

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
                            client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[0]}','44','${resultados[0].id}')`); 
                            client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[1]}','45','${resultados[0].id}')`); 
                            client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[2]}','46','${resultados[0].id}')`); 
  
                            
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
                          client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[0]}','48','${resultados[0].id}')`); 
                                   
                          return  client       
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
                            client.query(`insert into respuestasRP(respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[0]}','49','${resultados[0].id}')`); 
                                     
                            return  client       
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
                            client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','1','${resultados[0].id}')`); 
                            client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','2','${resultados[0].id}')`); 
                            client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','3','${resultados[0].id}')`); 
                            client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','4','${resultados[0].id}')`); 
                            client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[4]}','5','${resultados[0].id}')`); 
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
                              client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','6','${resultados[0].id}')`); 
                              client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','7','${resultados[0].id}')`); 
                              client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','8','${resultados[0].id}')`); 
                              
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
                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','9','${resultados[0].id}')`); 
                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','10','${resultados[0].id}')`); 
                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','11','${resultados[0].id}')`); 
                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','12','${resultados[0].id}')`); 

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
                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','13','${resultados[0].id}')`); 
                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','14','${resultados[0].id}')`); 
                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','15','${resultados[0].id}')`); 
                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','16','${resultados[0].id}')`); 
  
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
                                    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','17','${resultados[0].id}')`); 
                                    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','18','${resultados[0].id}')`); 
                                    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','19','${resultados[0].id}')`); 
                                    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','20','${resultados[0].id}')`); 
                                    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[4]}','21','${resultados[0].id}')`); 
                                    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[5]}','22','${resultados[0].id}')`); 
    
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
                                      client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','23','${resultados[0].id}')`); 
                                      client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','24','${resultados[0].id}')`); 
                                      client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','25','${resultados[0].id}')`); 
                                      client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','26','${resultados[0].id}')`); 
                                      client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[4]}','27','${resultados[0].id}')`); 
                                      client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[5]}','28','${resultados[0].id}')`); 
      
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
                                        client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','29','${resultados[0].id}')`); 
                                        client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','30','${resultados[0].id}')`); 
                              
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
                                          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','31','${resultados[0].id}')`); 
                                          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','32','${resultados[0].id}')`); 
                                          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','33','${resultados[0].id}')`); 
                                          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','34','${resultados[0].id}')`); 
                                          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[4]}','35','${resultados[0].id}')`); 
                                          client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[5]}','36','${resultados[0].id}')`); 
          
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
                                            client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','37','${resultados[0].id}')`); 
                                            client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','38','${resultados[0].id}')`); 
                                            client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','39','${resultados[0].id}')`); 
                                            client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','40','${resultados[0].id}')`); 
                                            client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[4]}','41','${resultados[0].id}')`); 
            
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
                                              client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','42','${resultados[0].id}')`); 
                                              client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','43','${resultados[0].id}')`); 
                                              client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','44','${resultados[0].id}')`); 
                                              client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','45','${resultados[0].id}')`); 
                                              client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[4]}','46','${resultados[0].id}')`); 
              
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
                                              resolve(resultados)
                                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','47','${resultados[0].id}')`); 
                                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','48','${resultados[0].id}')`); 
                                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','49','${resultados[0].id}')`); 
                                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','50','${resultados[0].id}')`); 
                                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[4]}','51','${resultados[0].id}')`); 
                                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[5]}','52','${resultados[0].id}')`); 
                                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[6]}','53','${resultados[0].id}')`); 
                                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[7]}','54','${resultados[0].id}')`); 
                                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[8]}','55','${resultados[0].id}')`); 
                                                client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[9]}','56','${resultados[0].id}')`); 
                
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
                                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','57','${resultados[0].id}')`); 
                                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','58','${resultados[0].id}')`); 
                                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','59','${resultados[0].id}')`); 
                                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','60','${resultados[0].id}')`); 
                                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[4]}','61','${resultados[0].id}')`); 
                                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[5]}','62','${resultados[0].id}')`); 
                                            
                                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[6]}','63','${resultados[0].id}')`); 
                                                  client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[7]}','64','${resultados[0].id}')`); 
                                                  
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
                                                    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','65','${resultados[0].id}')`); 
                                                    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','66','${resultados[0].id}')`); 
                                                    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','67','${resultados[0].id}')`); 
                                                    client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','68','${resultados[0].id}')`); 
                                                   
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
                                                      client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[0]}','69','${resultados[0].id}')`); 
                                                      client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','70','${resultados[0].id}')`); 
                                                      client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[2]}','71','${resultados[0].id}')`); 
                                                      client.query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[3]}','72','${resultados[0].id}')`); 
                                                     
                                                      return  client       
                                                  },
                                                )
                                                })
                                              };
  

                                


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                  const AtsPoliticaPrivacidad = async data => {
                    return  new Promise((resolve, reject) => {
                          client
                          .query(`select * from  empleados where correo='${data[0]}' `,
                          function (error, results, fields) {
                          if (error) reject(error) 
                            var string=JSON.stringify(results);
                            var resultados =  JSON.parse(string); 
                            resolve(resultados) 
                            client
                            .query(`insert into respuestasATS(respuestas,fk_preguntasATS,fk_Empleados) values ('${data[1]}','11','${resultados[0].id}')`); 
                            return  client
                          },
                        )
                        })
                      };


                  const RPPoliticaPrivacidad = async data => {

                    console.log("datauseraction" ,  data)

                    return  new Promise((resolve, reject) => {
                        client
                        .query(`select * from  empleados where correo='${data[0]}' `,
                          function (error, results, fields) {
                          if (error) reject(error) 
                          var string=JSON.stringify(results);
                          var resultados =  JSON.parse(string); 
                          resolve(resultados) 
                            client
                            .query(`insert into respuestasRP(Respuestas,fk_preguntasRP,fk_EmpleadosRP) values ('${data[1]}','47','${resultados[0].id}')`); 
                            return  client
                        },
                      )
                      })
                    };

                    const EEOPoliticaPrivacidad = async data => {
                      return  new Promise((resolve, reject) => {
                          client
                          .query(`select * from  empleados where correo='${data[0]}' `,
                            function (error, results, fields) {
                            if (error) reject(error) 
                            var string=JSON.stringify(results);
                            var resultados =  JSON.parse(string); 
                            resolve(resultados) 
                              client
                              .query(`insert into respuestasEEO(respuestas,fk_preguntasEEO,fk_Empleados) values ('${data[1]}','73','${resultados[0].id}')`); 
                              return  client
                          },
                        )
                        })
                      };



                    const  SendMail = async (args) => {
                      
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
                             user: 'd93409@gmail.com',
                             pass: 'jesus33.',
                             host: 'smtp.gmail.com',
                             port: 465,
                         }
                     });
                     const mailOptions = {
                      from: 'd93409@gmail.com', // sender address
                      to: `${args[0]}`, // list of receivers
                      subject: 'Subject of your email', // Subject line
                      html: '<p>Hola armando esto es una prueba del envio de correo desde el sistema</p>'// plain text body
                    };

                    transporter.sendMail(mailOptions, function (err, info) {
                      if("este es el error" , err)
                        console.log(err)
                      else
                        console.log("esta es la info" ,  info);
                   });

                    var encuesta = ""
                    
                    if(args[2]==1){

                      encuesta="ATS"

                    }if(args[2]==2){

                      encuesta="RP"
                    }
                    if(args[2]==3){

                      encuesta="EEO"
                    }

                   
                   return  new Promise((resolve, reject) => {
                    client
                    .query(`insert into correos(Encuesta,fecha,fk_empleados,contestado) values ('${encuesta}','${FechaCompleta}','${args[1]}','false')`); 
                    return  client
                    
                  })
                  }

                    const getUsers = async data => {

                      console.log("datauseraction" ,  data)
  
                      return  new Promise((resolve, reject) => {
                          client
                          .query(`select empleados.id,empleados.nombre,empleados.ApellidoP,empleados.ApellidoM,empleados.Curp,empleados.rfc,empleados.FechaNacimiento,empleados.Sexo,empleados.cp,empleados.EstadoCivil,empleados.correo,empleados.AreaTrabajo,empleados.Puesto,empleados.Ciudad,empleados.NivelEstudios,empleados.TipoPersonal,empleados.JornadaTrabajo,empleados.TipoContratacion,empleados.TiempoPuesto,empleados.ExperienciaLaboral,empleados.RotacionTurnos,empleados.fk_administrador from empleados inner join administrador on empleados.fk_administrador= administrador.id where administrador.correo='${data.email}' `,
                            function (error, results, fields) {
                            if (error) reject(error) 
                            var string=JSON.stringify(results);
                            var resultados =  JSON.parse(string); 
                            resolve(resultados) 
                            console.log("resultados",resultados)
                          },
                        )
                        })
                      };

                  module.exports = {
                    signup,
                    login,
                    registerEm,
                    registerRazonS,
                    getUsers,
                    registerSingleEm,
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

                    SendMail
                  }