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


const registerEmployee =async (_,{ data,email} ) => {
    // console.log("la data es")
    // var nombre = data.data
    // var nombres = nombre.split(",");
    console.log("esta es la data" , data)
    console.log("email" , email)
  
    // console.log("la data en la mutation es " ,data.data)
    const datosEmployee = await  actions.registerEm(data)
                   return datosEmployee;
};

// const fkEmployee= async (_,email,password)=>{

//     return actions.addfkemployees(email,password) 
// }


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
    // fkEmployee

    // uploadFile,
};