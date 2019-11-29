

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


const atsPage1 = async (_,  data ) => {
 
    console.log("la data en mutation es  atspage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.AtsPage1(divisiones)
                   return datosRS;
};

const atsPage2 = async (_,  data ) => {
 
    console.log("la data en mutation es  atspage2" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.AtsPage2(divisiones)
                   return datosRS;
};

const atsPage3 = async (_,  data ) => {
 
    console.log("la data en mutation es  atspage2" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.AtsPage3(divisiones)
                   return datosRS;
};

const atsPage4 = async (_,  data ) => {
 
    console.log("la data en mutation es  atspage2" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.AtsPage4(divisiones)
                   return datosRS;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const rpPage1 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPage1(divisiones)
                   return datosRS;
};


const rpPage2 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPage2(divisiones)
                   return datosRS;
};

const rpPage3 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPage3(divisiones)
                   return datosRS;
};

const rpPage4 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPage4(divisiones)
                   return datosRS;
};

const rpPage5 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPage5(divisiones)
                   return datosRS;
};

const rpPage6 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPage6(divisiones)
                   return datosRS;
};

const rpPage7 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPage7(divisiones)
                   return datosRS;
};

const rpPage8 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPage8(divisiones)
                   return datosRS;
};

const rpValidadorPage7 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPValidadorPage7(divisiones)
                   return datosRS;
};

const rpValidadorPage8 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPValidadorPage8(divisiones)
                   return datosRS;
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const atsPoliticaPrivacidad = async (_,  data ) => {
    console.log("la data en mutation es politica" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.AtsPoliticaPrivacidad(divisiones)
                   return datosRS;

};
const rpPoliticaPrivacidad = async (_,  data ) => {
    console.log("la data en mutation es politica" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPoliticaPrivacidad(divisiones)
                   return datosRS;

};







module.exports = {
    signup,
    login,
    registerEmployee,
    registerRS,
    registerSingleEmployee,
    atsPage1,
    atsPage2,
    atsPage3,
    atsPage4,

    rpPage1,
    rpPage2,
    rpPage3,
    rpPage4,
    rpPage5,
    rpPage6,
    rpPage7,
    rpPage8,
    rpValidadorPage7,
    rpValidadorPage8,

    atsPoliticaPrivacidad,
    rpPoliticaPrivacidad
};