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
    console.log("args",args)
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
// const verifiEmailSurveyATS= (_, { data }) => {
//     var miCadena =data[0];
//     var divisiones = miCadena.split(",");
//      return actions.VerifiEmailSurveyATS(divisiones)
//                    .then( res => res)
//                    .catch( err => err );
//  };
//  const verifiEmailSurveyRP= (_, { data }) => {
//     var miCadena =data[0];
//     var divisiones = miCadena.split(",");
//      return actions.VerifiEmailSurveyRP(divisiones)
//                    .then( res => res)
//                    .catch( err => err );
//  };
//  const verifiEmailSurveyEEO= (_, { data }) => {
//     var miCadena =data[0];
//     var divisiones = miCadena.split(",");
//      return actions.VerifiEmailSurveyEEO(divisiones)
//                    .then( res => res)
//                    .catch( err => err );
//  };
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
    console.log("divisiones",divisiones)
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
    console.log("divisiones",divisiones)
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
    console.log("divisiones",divisiones)
    return actions.GetUsersTableEmployeesthisPeriodoATS(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getEmpresas= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    console.log("divisiones",divisiones)
    return actions.GetEmpresas(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getAdminDashboard= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    console.log("divisiones",divisiones)
    return actions.GetAdminDashboard(divisiones)
    .then( res => res)
    .catch( err => err );
};
const verifyPackSuperUser= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    console.log("divisiones",divisiones)
    return actions.VerifyPackSuperUser(divisiones)
    .then( res => res)
    .catch( err => err );
};
const countEmpresas= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    console.log("divisiones",divisiones)
    return actions.CountEmpresas(divisiones)
    .then( res => res)
    .catch( err => err );
};
const getAdminAlfa= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    console.log("divisiones",divisiones)
    return actions.GetAdminAlfa(divisiones)
    .then( res => res)
    .catch( err => err );
};

const getImage= async (_, { data }) => {
    var miCadena =data[0];
    var divisiones = miCadena.split(",");
    console.log("divisiones",divisiones)
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




     module.exports = {
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
        //   verifiEmailSurveyEEO,
        //   verifiEmailSurveyRP,
        //   verifiEmailSurveyATS,
          getUsersTableEmployees,
          resultSingleSurvey ,
          resultSingleSurveyRP,
          resultSingleSurveyEEO
     }