const actions = require('../actions');
// const { authUserById } = require('../utils');

const signup = (_, { data }) => {
    console.log("data",data)
    return actions.signup(data)
                  .then( res => res)
                  .catch( err => err );
};

const login = async (_, {email, password}) => {
   
    return actions.login(email, password)      
};
    
// const createUser = async (_, {data}) => {
//     return actions.createUser(data)
//                   .then( newUser => newUser )
//                   .catch( err => err);
// };


const registerEmployee =async (_,  data ) => {
    // console.log("la data es")

    // var nombre = data.data
    // var nombres = nombre.split(",");

    var miCadena =data.data[0];
var divisiones = miCadena.split(",");
console.log("la nueva data es " , divisiones)
    // console.log("la data en la mutation es " ,data.data)
    const datosEmployee = await  actions.registerEm(divisiones)
                   return datosEmployee;
};

const registerRS =async (_,  data ) => {
   
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");

    console.log("la data en la mutation es " ,divisiones)
    const datosRS = await  actions.registerRazonS(divisiones)
                   return datosRS;
};


module.exports = {
    signup,
    login,
    registerEmployee,
    registerRS
    // createUser,

    // uploadFile,
};