const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cloudinary = require('cloudinary');

const createToken = (email ,password) => {
    const payload = {
        //_id,
        email,
        password
    }
    return jwt.sign(payload, 'shh');
};

// const authUserById = (context) => {
//     const Authorization = context.request.get("Authorization");
//     if (Authorization) {
//         const token = Authorization.replace("JWT ", "");
//         const { _id } = jwt.verify(token, process.env.JWT_SECRET);
//         return User.findOne({ _id });
//     }

//     throw new Error("No estás autenticado");
// }

// const storeUpload = (stream) => {
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_NAME, 
//         api_key: process.env.CLOUDINARY_KEY, 
//         api_secret: process.env.CLOUDINARY_SECRET, 
//     });

//     return new Promise((resolve, reject) => {
//         const buffer = cloudinary.v2.uploader.upload_stream((err, result) => {
//             if(err) reject(err);
//             resolve(result);
//         });

//         stream.pipe(buffer);
//     });
// }

module.exports = {
    createToken,
    // authUserById,
    // storeUpload,
}