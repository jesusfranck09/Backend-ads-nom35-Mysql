// // const bcrypt = require('bcrypt');
// const { createUser, getUserByEmail } = require('./userActions');
// const { createToken } = require('../utils');
// // const { createWriteStream } = require("fs");

// const signup = (user) => {
//     return new Promise((resolve, reject) => {
//         createUser(user)
//             .then( newUser => {
//                 resolve({
//                     message: 'Signup exitoso',
//                     token: createToken( newUser.email)})
//             })
//             .catch( err => {
//                 reject({ 
//                     message: 'Error',
//                     token: err});
//             });
//     });
// }


// const login = (email, password) => {
//     return new Promise((resolve, reject) => {

//         getUserByEmail(email,password)
//             .then(user => {
//                 if (!user) {
//                     reject({
//                     message: 'Usuario no encontrado',
//                     token:null })
//                 }
//                 console.log("las filas son ",user.rows)
//                 if (password === user.rows[0].password) {
//                     resolve({
//                         message: 'Login exitoso',
//                         token: createToken(user.rows[0].email)});
//                 } else {
//                     reject({ message: "Hubo un error", token: 'ERROR'})
//                 } 
              
//             })
//             .catch( err => {
//                 console.log(err)
//                 reject({ 
//                 message: 'Hubo errores', token: 'ERROR'})}
//                 );
//     })
// };

// // const storeUpload = ({ stream, filename }) =>
// //   new Promise((resolve, reject) =>{
// //     UploadFiles(stream)
// //     stream 
// //       .pipe(createWriteStream(filename))
// //       .on("finish", () => resolve())
// //       .on("error", reject)
// //   });


// module.exports = {
//     signup,
//     login,
//     // storeUpload,
// }