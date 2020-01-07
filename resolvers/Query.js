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
     
     module.exports = {
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