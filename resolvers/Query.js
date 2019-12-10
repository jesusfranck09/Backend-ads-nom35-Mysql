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

     
     module.exports = {
          getUsersTableEmployees,
          resultSingleSurvey 
     }