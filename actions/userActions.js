
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
      
      return new Promise((resolve, reject) => {
          client
          .query(`select * from  empleados where correo='${data[7]}'`,
           function (error, results, fields) {
           if (error) reject(error) 
            var string=JSON.stringify(results);
            var resultados =  JSON.parse(string); 
            resolve(resultados)
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


  AtsPoliticaPrivacidad,
  RPPoliticaPrivacidad
}