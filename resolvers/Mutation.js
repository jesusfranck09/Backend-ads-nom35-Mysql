

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const eeoPage1 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage1(divisiones)
                   return datosRS;
};


const eeoPage2 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage2" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage2(divisiones)
                   return datosRS;
};
const eeoPage3 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage3" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage3(divisiones)
                   return datosRS;
};
const eeoPage4 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage4" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage4(divisiones)
                   return datosRS;
};
const eeoPage5 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage5" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage5(divisiones)
                   return datosRS;
};
const eeoPage6 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage6" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage6(divisiones)
                   return datosRS;
};
const eeoPage7 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage6" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage7(divisiones)
                   return datosRS;
};
const eeoPage8 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage6" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage8(divisiones)
                   return datosRS;
};
const eeoPage9 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage6" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage9(divisiones)
                   return datosRS;
};

const eeoPage10 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage6" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage10(divisiones)
                   return datosRS;
};
const eeoPage11 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage6" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage11(divisiones)
                   return datosRS;
};

const eeoPage12 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage6" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage12(divisiones)
                   return datosRS;
};

const eeoPage13 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage6" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage13(divisiones)
                   return datosRS;
};

const eeoPage14 = async (_,  data ) => {
 
    console.log("la data en mutation es  rppage6" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage14(divisiones)
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

const eeoPoliticaPrivacidad = async (_,  data ) => {
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPoliticaPrivacidad(divisiones)
                   return datosRS;
};




const sendMail = async (_,  data ) => {
    console.log("la data en mutation es  rppage1" ,  data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const mail = await  actions.SendMail(divisiones)
                   return mail;
};

const getAdmin = (_, { data }) => {
    console.log("data en la Mutation",data)
    return actions.GetAdmin(data)
                  .then( res => res)
                  .catch( err => err );
};

const authRegisterSingleEmployee = (_, { data }) => {
    console.log("data en la Mutation",data)
    return actions.AuthRegisterSingleEmployee(data)
                  .then( res => res)
                  .catch( err => err );
};



const inactiveAdmin= (_, { data }) => {
    return actions.InactiveAdmin(data)
                  .then( res => res)
                  .catch( err => err );
};


module.exports = {
 
    inactiveAdmin,
    authRegisterSingleEmployee,
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

    eeoPage1,
    eeoPage2,
    eeoPage3,
    eeoPage4,
    eeoPage5,
    eeoPage6,
    eeoPage7,
    eeoPage8,
    eeoPage9,
    eeoPage10,
    eeoPage11,
    eeoPage12,
    eeoPage13,
    eeoPage14,
    
    sendMail,
    getAdmin,



    atsPoliticaPrivacidad,
    rpPoliticaPrivacidad,
    eeoPoliticaPrivacidad
};