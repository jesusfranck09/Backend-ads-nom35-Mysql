const actions = require('../actions');
const client = require('../database/');


const getUsersTableEmployeesthisPeriodo= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");

    return actions.GetUsersTableEmployeesthisPeriodo(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getUsersTableEmployees = (_,args ) => {
    return actions.getUsers(args)
    .then( res => res)
     .catch( err => err );
                
}

const resultSingleSurvey = (_,args ) => {
    var miCadena =args.data[0];
    var divisiones = miCadena.split(",");
     return actions.ResultSingleSurvey(divisiones)
     .then( res => res)
      .catch( err => err );
                 
}

const resultSingleSurveyRP = (_,args ) => {
    var miCadena =args.data[0];
    var divisiones = miCadena.split(",");
     return actions.ResultSingleSurveyRP(divisiones)
     .then( res => res)
      .catch( err => err );
                 
}

const resultSingleSurveyEEO = (_,args ) => {
    var miCadena =args.data[0];
    var divisiones = miCadena.split(",");
     return actions.ResultSingleSurveyEEO(divisiones)
     .then( res => res)
      .catch( err => err );
                 
}

 const getSucursales= (_, { data }) => {
     return actions.GetSucursales(data)
                   .then( res => res)
                   .catch( err => err );
 };
 const getDeptos= (_, { data }) => {
     return actions.GetDeptos(data)
                   .then( res => res)
                   .catch( err => err );
 };

 const getPuestos= (_, { data }) => {
     return actions.GetPuestos(data)
                   .then( res => res)
                   .catch( err => err );
 };
 const getPonderacion= async (_, { data }) => {
    return actions.GetPonderacion(data)
    .then( res => res)
    .catch( err => err );
};

const getPonderacionEEO= async (_, { data }) => {
     return actions.GetPonderacionEEO(data)
     .then( res => res)
     .catch( err => err );
 };

 const getEmployeesResolvesSurveyATS= async (_, { data }) => {
    return actions.GetEmployeesResolvesSurveyATS(data)
    .then( res => res)
    .catch( err => err );
};
const getEmployeesResolvesSurveyRP= async (_, { data }) => {
    return actions.GetEmployeesResolvesSurveyRP(data)
    .then( res => res)
    .catch( err => err );
};
const getEmployeesResolvesSurveyEEO= async (_, { data }) => {
    return actions.GetEmployeesResolvesSurveyEEO(data)
    .then( res => res)
    .catch( err => err );
};

const getEmployeesResolvesSurveyATSFalse= async (_, { data }) => {
    return actions.GetEmployeesResolvesSurveyATSFalse(data)
    .then( res => res)
    .catch( err => err );
};
const getEmployeesResolvesSurveyRPFalse= async (_, { data }) => {
    return actions.GetEmployeesResolvesSurveyRPFalse(data)
    .then( res => res)
    .catch( err => err );
};
const getEmployeesResolvesSurveyEEOFalse= async (_, { data }) => {
    return actions.GetEmployeesResolvesSurveyEEOFalse(data)
    .then( res => res)
    .catch( err => err );
};
 
const countEmployees= async (_, { data }) => {
    return actions.CountEmployees(data)
    .then( res => res)
    .catch( err => err );
};

const getEmployeesATSDetectado= async (_, { data }) => {
    return actions.GetEmployeesATSDetectado(data)
    .then( res => res)
    .catch( err => err );
};
const getEmployeesResolvesRP= async (_, { data }) => {
    return actions.GetEmployeesResolvesRP(data)
    .then( res => res)
    .catch( err => err );
};

const getresultGlobalSurveyRP= async (_, { data }) => {
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
    return actions.GetresultGlobalSurveyRP(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getEmployeesResolvesEEO= async (_, { data }) => {
    return actions.GetEmployeesResolvesEEO(data)
    .then( res => res)
    .catch( err => err );
};
const getresultGlobalSurveyEEO= async (_, { data }) => {
    var miCadena =data[0];

    var divisiones = miCadena.split(",");
 
    return actions.GetresultGlobalSurveyEEO(divisiones)
    .then( res => res)
    .catch( err => err );
};
const employeeActive= async (_, { data }) => {
    return actions.EmployeeActive(data)
    .then( res => res)
    .catch( err => err );
};
const deptoActive= async (_, { data }) => {
    return actions.DeptoActive(data)
    .then( res => res)
    .catch( err => err );
};
const sucActive= async (_, { data }) => {
    return actions.SucActive(data)
    .then( res => res)
    .catch( err => err );
};
const puestoActive= async (_, { data }) => {
    return actions.PuestoActive(data)
    .then( res => res)
    .catch( err => err );
};
 
const getPeriodo= async (_, { data }) => {
    return actions.GetPeriodo(data)
    .then( res => res)
    .catch( err => err );
};
const getPeriodoDesabilited= async (_, { data }) => {
    return actions.GetPeriodoDesabilited(data)
    .then( res => res)
    .catch( err => err );
};
const getEventos= async (_, { data }) => {
    return actions.GetEventos(data)
    .then( res => res)
    .catch( err => err );
};
const getEmployeesFkAdmin= async (_, { data }) => {
    return actions.GetEmployeesFkAdmin(data)
    .then( res => res)
    .catch( err => err );
};

const getUsersTableEmployeesthisPeriodoEEO= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.GetUsersTableEmployeesthisPeriodoEEO(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getAdminFechaRegistro= async (_, { data }) => {
    return actions.GetAdminFechaRegistro(data)
    .then( res => res)
    .catch( err => err );
};

const getUsersTableEmployeesthisPeriodoATS= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.GetUsersTableEmployeesthisPeriodoATS(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getEmpresas= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.GetEmpresas(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getAdminDashboard= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.GetAdminDashboard(divisiones)
    .then( res => res)
    .catch( err => err );
};
const verifyPackSuperUser= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.VerifyPackSuperUser(divisiones)
    .then( res => res)
    .catch( err => err );
};
const countEmpresas= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.CountEmpresas(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getAdminAlfa= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.GetAdminAlfa(divisiones)
    .then( res => res)
    .catch( err => err );
};

const getImage= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.getImage(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getallPeriodo= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.GetallPeriodo(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getCorreos= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.GetCorreos(divisiones)
    .then( res => res)
    .catch( err => err );
};

const getresultGlobalSurveyATS= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.GetresultGlobalSurveyATS(divisiones)
    .then( res => res)
    .catch( err => err );
};

const getEmployeesResolvesATS= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    return actions.GetEmployeesResolvesATS(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getLogo = async(_, { data }) => {

    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const getlogo = await  actions.GetLogo(divisiones)
    return getlogo;
};
const resetPassword = async(_, { data }) => {

    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const reset = await  actions.ResetPassword(divisiones)
    return reset;
};
const getCardPay = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const card = await  actions.GetCardPay(divisiones)
    return card;
};

const getCardPayRealizada = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const cardPayRealizada = await  actions.GetCardPayRealizada(divisiones)
    return cardPayRealizada;
};

const verifiDataSuperUser = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const verifi = await  actions.VerifiDataSuperUser(divisiones)
    return verifi;
};
const getSuperUser = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const user = await  actions.GetSuperUSer(divisiones)
    return user;
};
const getRenovacion = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const renovacion = await  actions.GetRenovacion(divisiones)
    return renovacion;
};
const getPromocion = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const promocion = await  actions.GetPromocion(divisiones)
    return promocion;
};
const getAllSuperUser = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const getsuperUser = await  actions.GetAllSuperUser(divisiones)
    return getsuperUser;
};
const getEmpleadosGlobales = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const getEmpleados = await  actions.GetEmpleadosGlobales(divisiones)
    return getEmpleados;
};
const getTablePeriodo = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const table = await  actions.GetTablePeriodo(divisiones)
    return table;
};

const getSingleEmployee = async(_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    const table = await  actions.GetSingleEmployee(divisiones)
    return table;
};

     module.exports = {
        getSingleEmployee,
        getTablePeriodo,
        getEmpleadosGlobales,
        getAllSuperUser,
        getPromocion,
        getRenovacion,
        getSuperUser,
        verifiDataSuperUser,
        getCardPayRealizada,
        getCardPay,
        resetPassword,
        getLogo,
        getEmployeesResolvesATS,
        getresultGlobalSurveyATS,
        getCorreos,
        getallPeriodo,
        getImage,
        getAdminAlfa,
        countEmpresas,
        verifyPackSuperUser,
        getAdminDashboard,
        getEmpresas,
        getUsersTableEmployeesthisPeriodoATS,
        getAdminFechaRegistro,
        getUsersTableEmployeesthisPeriodoEEO,
        getUsersTableEmployeesthisPeriodo,
        getEmployeesFkAdmin,
        getEventos,
        getPeriodoDesabilited,
        getPeriodo,
        puestoActive,
        sucActive,
        deptoActive,
        employeeActive,
        getresultGlobalSurveyEEO,
        getEmployeesResolvesEEO,
        getresultGlobalSurveyRP,
        getEmployeesResolvesRP,
        getEmployeesATSDetectado,
        countEmployees,
        getEmployeesResolvesSurveyEEOFalse,
        getEmployeesResolvesSurveyRPFalse,
        getEmployeesResolvesSurveyATSFalse,
          getEmployeesResolvesSurveyATS,
          getEmployeesResolvesSurveyRP,
          getEmployeesResolvesSurveyEEO,
          getPonderacionEEO,
          getPonderacion,
          getPuestos,
          getDeptos,
          getSucursales,

          getUsersTableEmployees,
          resultSingleSurvey ,
          resultSingleSurveyRP,
          resultSingleSurveyEEO
     }