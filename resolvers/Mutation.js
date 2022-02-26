

const actions = require('../actions');
// const { authUserById } = require('../utils');
const registroSuperUser = async (_,  data ) => {
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");

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
 
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.AtsPage1(divisiones)
                   return datosRS;
};

const atsPage4 = async (_,  data ) => {
     var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.AtsPage4(divisiones)
                   return datosRS;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const rpPage8 = async (_,  data ) => {
     var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPage8(divisiones)
                   return datosRS;
};

const rpValidadorPage7 = async (_,  data ) => {
 
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPValidadorPage7(divisiones)
                   return datosRS;
};

const rpValidadorPage8 = async (_,  data ) => {
 
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPValidadorPage8(divisiones)
                   return datosRS;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const eeoPage14 = async (_,  data ) => {
     var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPage14(divisiones)
                   return datosRS;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const atsPoliticaPrivacidad = async (_,  data ) => {
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.AtsPoliticaPrivacidad(divisiones)
                   return datosRS;

};
const rpPoliticaPrivacidad = async (_,  data ) => {
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.RPPoliticaPrivacidad(divisiones)
                   return datosRS;

};

const eeoPoliticaPrivacidad = async (_,  data ) => {
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const datosRS = await  actions.EEOPoliticaPrivacidad(divisiones)
                   return datosRS;
};




const sendMail = async (_,  data ) => {
    var miCadena =data.data[0];
    var divisiones = miCadena.split(",");
    const mail = await  actions.SendMail(divisiones)
                   return mail;
};

const getAdmin = (_, { data }) => {
    return actions.GetAdmin(data)
                  .then( res => res)
                  .catch( err => err );
};

const authRegisterSingleEmployee = (_, { data }) => {
    return actions.AuthRegisterSingleEmployee(data)
                  .then( res => res)
                  .catch( err => err );
};



const inactiveAdmin= (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.InactiveAdmin(divisiones)
                  .then( res => res)
                  .catch( err => err );
};
const registerSucursales= async (_, { data }) => {
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    const datosSucursales = await  actions.RegisterSucursales(divisiones)
    return datosSucursales;
}


const registerApartments= async (_, { data }) => {
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

const loginEmpresas = async (_, {data}) => { 
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.LoginEmpresas(divisiones)      
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
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const update = await  actions.UpdatePassword(divisiones)
    return update;
};

const updateLogo = async(_, { data }) => {
        var miCadena =data[0];
        var divisiones = miCadena.split(",");
        const update = await  actions.UpdateLogo(divisiones)
        return update;
    };

    
const cardPay = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const card = await  actions.CardPay(divisiones)
    return card;
};
const updateCardPay = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const updateCard = await  actions.UpdateCardPay(divisiones)
    return updateCard;
};

const renovationLicence = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const renovation = await  actions.RenovationLicence(divisiones)
    return renovation;
};
const addPromotions = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const promocion = await  actions.AddPromotions(divisiones)
    return promocion;
};
const approvedPromotion = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const approved = await  actions.ApprovedPromotion(divisiones)
    return approved;
};
const rejectPromotion = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const reject = await  actions.RejectPromotion(divisiones)
    return reject;
};
const transactions = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const transactions = await  actions.Transactions(divisiones)
    return transactions;
};
const transactionsMadmin = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const transactionsmadmin = await  actions.TransactionsMadmin(divisiones)
    return transactionsmadmin;
};
const transactionsEval = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const transactionsEval = await  actions.TransactionsEval(divisiones)
    return transactionsEval;
};
const updateEvalEEO = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const updateEvalEEO = await  actions.updateEvalEEO(divisiones)
    return updateEvalEEO;
};
const deleteEval = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const deleteEval = await  actions.DeleteEval(divisiones)
    return deleteEval;
};
const renovacionLicencias = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const renovacion = await actions.RenovacionLicencias(divisiones)
    return renovacion;
};

const updateSuperUser = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const updateSuperUser = await actions.UpdateSuperUser(divisiones)
    return updateSuperUser;
};
module.exports = {
    updateSuperUser,
    renovacionLicencias,
    deleteEval,
    updateEvalEEO,
    transactionsEval,
    transactionsMadmin,
    transactions,
    rejectPromotion,
    approvedPromotion,
    addPromotions,
    renovationLicence,
    updateCardPay,
    cardPay,
    updateLogo,
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
    atsPage4,
    rpPage8,
    rpValidadorPage7,
    rpValidadorPage8,
    eeoPage14,
    
    sendMail,
    getAdmin,



    atsPoliticaPrivacidad,
    rpPoliticaPrivacidad,
    eeoPoliticaPrivacidad
};