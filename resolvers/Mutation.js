

const actions = require('../actions');
// const { authUserById } = require('../utils');
const registroSuperUser = async (_,  data ) => {
    console.log("data" ,data)
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    console.log("data" ,divisiones)

    const registro = await  actions.signup(divisiones)
                   return registro;
};

// const signup = (_, { data }) => {
//     // console.log("data",data)
//     return actions.signup(data)
//                   .then( res => res)
//                   .catch( err => err );
// };
const login = async (_, {email, password}) => { 
    return actions.login(email, password)      
};
const loginAdminAlfa = async (_, {email, password}) => { 
    return actions.LoginAdminAlfa(email, password)      
};
const signupAdminAlfa = (_, { data }) => {
    // console.log("data",data)
    return actions.SignupAdminAlfa(data)
                  .then( res => res)
                  .catch( err => err );
};

const registerEmployee =async (_,  data ) => {
    var miCadena =data.data[0];
var divisiones = miCadena.split(",");
    const datosEmployee = await  actions.registerEm(divisiones)
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
    console.log("dataMutation" , data)
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
const registerSucursales= async (_, { data }) => {
    console.log("data" ,data)
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    const datosSucursales = await  actions.RegisterSucursales(divisiones)
    return datosSucursales;
}


const registerApartments= async (_, { data }) => {
    console.log("data" ,data)
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    const datosApartment = await  actions.RegisterApartments(divisiones)
    return datosApartment;
};
const registerPuesto= async (_, { data }) => {
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    const datosPuesto = await  actions.RegisterPuesto(divisiones)
    return datosPuesto;
};

const deleteEmployees= async (_, { data }) => {
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    const datosEmpleados = await  actions.DeleteEmployees(divisiones)
    return datosEmpleados;
};

const deleteSucursales= async (_, { data }) => {
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    const datosSucursales = await  actions.DeleteSucursales(divisiones)
    return datosSucursales;
};
const deleteDeptos= async (_, { data }) => {
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    const datosDeptos = await  actions.DeleteDeptos(divisiones)
    return datosDeptos;
};

const deletePuestos= async (_, { data }) => {
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    const datosPuestos = await  actions.DeletePuestos(divisiones)
    return datosPuestos;
};

const updateEmployees= async (_, { data }) => {
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    const updateEm = await  actions.UpdateEmployees(divisiones)
    return updateEm;
};

const updateSucursales= async (_, { data }) => {
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    const updateSuc = await  actions.UpdateSucursales(divisiones)
    return updateSuc;
};

const updateDeptos= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const updateDep = await  actions.UpdateDeptos(divisiones)
    return updateDep;
};

const updatePuestos= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const updatePue = await  actions.UpdatePuestos(divisiones)
    return updatePue;
};

const addPeriodo= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const add = await  actions.AddPeriodo(divisiones)
    return add;
};

const deletePeriodo= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const deleteP = await  actions.DeletePeriodo(divisiones)
    return deleteP;
};

// const updatePeriodo= async (_, { data }) => {
//     var miCadena =data[0];
//     var divisiones = miCadena.split(",");
//     const updatep = await  actions.UpdatePeriodo(divisiones)
//     return updatep;
// };

const addPeriodoInicial= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const add = await  actions.AddPeriodoInicial(divisiones)
    return add;
};

const addAdminEmpresa= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const add = await  actions.AddAdminEmpresa(divisiones)
    return add;
};
const insertPack= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const insert = await  actions.InsertPack(divisiones)
    return insert;
};

const loginEmpresas = async (_, {rfc, password}) => { 
    return actions.LoginEmpresas(rfc, password)      
};
const editDataAdmin= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const edit = await  actions.EditDataAdmin(divisiones)
    return edit;
};
const alert1= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const edit = await  actions.Alert1(divisiones)
    return edit;
};
const alert2= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const edit = await  actions.Alert2(divisiones)
    return edit;
};
const alert3= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const edit = await  actions.Alert3(divisiones)
    return edit;
};
const updatePeriodo= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const edit = await  actions.UpdatePeriodo(divisiones)
    return edit;
};

const loadLogo = async(_, { data }) => {

    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const upload = await  actions.LoadLogo(divisiones)
    return upload;
};

const updatePassword = async(_, { data }) => {
console.log("data mutation" ,data)
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const update = await  actions.UpdatePassword(divisiones)
    return update;
};

module.exports = {
    updatePassword,
    registroSuperUser,
    loadLogo,
    updatePeriodo,
    alert2,
    alert1,
    alert3,
    loginAdminAlfa,
    signupAdminAlfa,
    editDataAdmin,
    loginEmpresas,
    insertPack,
    addAdminEmpresa,
    addPeriodoInicial,
    // updatePeriodo,
    deletePeriodo,
    addPeriodo,
    updatePuestos,
    updateDeptos,
    updateSucursales,
    updateEmployees,
    deletePuestos,
    deleteDeptos,
    deleteSucursales,
    deleteEmployees,
    registerPuesto,
    registerApartments,
    registerSucursales,
    inactiveAdmin,
    authRegisterSingleEmployee,
    // signup,
    login,
    registerEmployee,
    registerRS,
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