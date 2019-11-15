const actions = require('../actions');
const client = require('../database/');


const getUsersTableEmployees = (_,args ) => {

      
 
     
     //    return  client.query(`SELECT * FROM administrador where correo = '${args.email}'`, (err, result) => {
     //           if(err) throw err;
     //        console.log("result" , result)
     //           return res.send(result);
     //          })


     //     console.log("resu",resultados )
     //    if(resultados != undefined){
     //         console.log("entro", resultados)
     //         return resultados
     //    }

          return actions.getUsers(args)
          .then( res => res)
           .catch( err => err );
                      

          }

     
     module.exports = {
          getUsersTableEmployees    
     }