const actions = require('../actions');
const client = require('../database/');


const getUsersTableEmployees = (_,args ) => {
          return actions.getUsers(args)
          .then( res => res)
           .catch( err => err );
                      
}

const resultSingleSurvey = (_,args ) => {
     return actions.ResultSingleSurvey(args)
     .then( res => res)
      .catch( err => err );
                 
}


const resultSingleSurveyRP = (_,args ) => {
     return actions.ResultSingleSurveyRP(args)
     .then( res => res)
      .catch( err => err );
                 
}

const resultSingleSurveyEEO = (_,args ) => {
     return actions.ResultSingleSurveyEEO(args)
     .then( res => res)
      .catch( err => err );
                 
}
const verifiEmailSurveyATS= (_, { data }) => {
     console.log("la data en query es ", data)
     return actions.VerifiEmailSurveyATS(data)
                   .then( res => res)
                   .catch( err => err );
 };
 const verifiEmailSurveyRP= (_, { data }) => {
     console.log("la data en query es ", data)
     return actions.VerifiEmailSurveyRP(data)
                   .then( res => res)
                   .catch( err => err );
 };
 const verifiEmailSurveyEEO= (_, { data }) => {
     console.log("la data en query es ", data)
     return actions.VerifiEmailSurveyEEO(data)
                   .then( res => res)
                   .catch( err => err );
 };
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
    return actions.GetresultGlobalSurveyRP(data)
    .then( res => res)
    .catch( err => err );
};
     
     module.exports = {
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
          verifiEmailSurveyEEO,
          verifiEmailSurveyRP,
          verifiEmailSurveyATS,
          getUsersTableEmployees,
          resultSingleSurvey ,
          resultSingleSurveyRP,
          resultSingleSurveyEEO
     }