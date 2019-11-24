

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


const registerEmployee =async (_,  data ) => {
    var miCadena =data.data[0];
var divisiones = miCadena.split(",");
    const datosEmployee = await  actions.registerEm(divisiones)
                   return datosEmployee;
};


const registerSingleEmployee =async (_,  data ) => {
    var miCadena =data.data[0];

    var divisiones = miCadena.split(",");
    const datosEmployee = await  actions.registerSingleEm(divisiones)
                   return datosEmployee;
};


const registerRS = async (_,  data ) => {
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.registerRazonS(divisiones)
                   return datosRS;
};



module.exports = {
    signup,
    login,
    registerEmployee,
    registerRS,
    registerSingleEmployee
};